"use client";

import { SearchBar } from "@/components/ui/SearchBar";
import { useFindUserByUsername } from "@/lib/hooks/auth/useFindUserByUsername";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface NewChatPrivateFormProps {
  onBackClick: () => void;
  onCreatePrivateConversation: (username: string) => string;
}

export const NewChatPrivateForm = ({
  onBackClick,
  onCreatePrivateConversation,
}: NewChatPrivateFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: user, isLoading } = useFindUserByUsername(searchQuery);

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

      <SearchBar placeholder="Enter username" onSearch={setSearchQuery} />
    </div>
  );
};
