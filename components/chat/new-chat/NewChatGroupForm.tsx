import { SearchBar } from "@/components/ui/SearchBar";
import { Conversation } from "@/lib/types/conversation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { NewChatSelectableUserList } from "./NewChatSelectableUserList";

interface NewChatGroupFormProps {
  onBackClick: () => void;
  onCreateGroupConversation: (groupName: string, members: string[]) => void;
  conversations?: Conversation[];
  isCreating: boolean;
  isLoadingConversations?: boolean;
}

export const NewChatGroupForm = ({
  onBackClick,
  onCreateGroupConversation,
  conversations,
  isCreating,
  isLoadingConversations,
}: NewChatGroupFormProps) => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 p-4">
        <button
          type="button"
          onClick={onBackClick}
          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-zinc-600 transtion-colors duration-300 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <span className="text-lg font-medium">New Group Chat</span>
      </div>

      <SearchBar placeholder="Search for users..." onSearch={() => {}} />

      <NewChatSelectableUserList
        conversations={conversations}
        isLoadingConversations={isLoadingConversations}
      />
    </div>
  );
};
