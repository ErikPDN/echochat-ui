"use client";

import { SearchBar } from "@/components/ui/SearchBar";
import { useFindUserByUsername } from "@/lib/hooks/auth/useFindUserByUsername";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NewChatUserCard } from "./NewChatUserCard";
import { isAxiosError } from "axios";
import { toast } from "sonner";

interface NewChatPrivateFormProps {
  onBackClick: () => void;
  onCreatePrivateConversation: (memberId: string) => void;
  isCreating: boolean;
}

export const NewChatPrivateForm = ({
  onBackClick,
  onCreatePrivateConversation,
  isCreating,
}: NewChatPrivateFormProps) => {
  const [searchInput, setSearchInput] = useState("");

  const {
    data: user,
    isLoading: isLoadingUser,
    error,
    refetch: refetchUser,
  } = useFindUserByUsername(searchInput);

  const isUserNotFound = isAxiosError(error) && error.response?.status === 404;

  useEffect(() => {
    if (error && !isUserNotFound) {
      toast.error(getErrorMessage(error));
    }
  }, [error, isUserNotFound]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 p-4">
        <button
          type="button"
          onClick={onBackClick}
          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-zinc-600 transition-colors duration-300 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <span className="text-lg font-medium">New Private Chat</span>
      </div>

      <SearchBar placeholder="Enter username" onSearch={setSearchInput} />

      {user && (
        <NewChatUserCard
          user={user}
          onCreatePrivateConversation={onCreatePrivateConversation}
          isLoading={isCreating}
        />
      )}

      {isUserNotFound && (
        <div className="mx-4 mt-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          User not found. Please check the username and try again.
        </div>
      )}

      {!user && (
        <div className="flex items-center justify-end gap-2 p-4">
          <button
            type="button"
            onClick={() => refetchUser()}
            disabled={isLoadingUser || !searchInput.trim()}
            className="w-fit bg-primary text-sm text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-hover transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingUser ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              "Search"
            )}
          </button>
        </div>
      )}
    </div>
  );
};
