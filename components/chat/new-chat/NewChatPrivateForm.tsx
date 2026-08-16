"use client";

import { SubmitEvent } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { useFindUserByUsername } from "@/lib/hooks/auth/useFindUserByUsername";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { useEffect, useState } from "react";
import { NewChatUserCard } from "./NewChatUserCard";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { PanelHeader } from "@/components/ui/PanelHeader";

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

  const handleSearchSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim() === "" || isLoadingUser) return;
    refetchUser();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSearchSubmit}>
      <PanelHeader onBackClick={onBackClick} title="New Private Chat" />

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
          <ButtonPrimary
            onClick={() => refetchUser()}
            text="Search"
            isLoading={isLoadingUser}
            disabledCondition={searchInput.trim() === "" || isLoadingUser}
          />
        </div>
      )}
    </form>
  );
};
