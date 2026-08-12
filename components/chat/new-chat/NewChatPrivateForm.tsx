"use client";

import { SearchBar } from "@/components/ui/SearchBar";
import { useFindUserByUsername } from "@/lib/hooks/auth/useFindUserByUsername";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { ArrowLeft, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { NewChatUserCard } from "./NewChatUserCard";

interface NewChatPrivateFormProps {
  onBackClick: () => void;
  onCreatePrivateConversation: (userId: string) => void;
}

export const NewChatPrivateForm = ({
  onBackClick,
  onCreatePrivateConversation,
}: NewChatPrivateFormProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const {
    data: user,
    isLoading,
    error,
  } = useFindUserByUsername(submittedQuery);

  const handleSearch = (query: string) => {
    setSubmittedQuery(query);
  };

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
          isLoading={isLoading}
        />
      )}

      {error && (
        <div className="mx-4 mt-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          {getErrorMessage(error)}
        </div>
      )}

      {!user && !error && (
        <div className="flex items-center justify-end gap-2 p-4">
          <button
            type="button"
            onClick={() => handleSearch(searchInput)}
            disabled={isLoading || !searchInput.trim()}
            className="w-fit bg-primary text-sm text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-hover transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
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
