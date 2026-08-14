import { Conversation } from "@/lib/types/conversation";
import { NewChatSelectableUserListItem } from "./NewChatSelectableUserListItem";
import { NewChatSelectableUserListSkeleton } from "./NewChatSelectableUserListSkeleton";
import { useState } from "react";

interface NewChatSelectableUserListProps {
  conversations?: Conversation[];
  isLoadingConversations?: boolean;
}

export const NewChatSelectableUserList = ({
  conversations,
  isLoadingConversations,
}: NewChatSelectableUserListProps) => {
  const [selectedConversations, setSelectedConversations] = useState<string[]>(
    [],
  );

  const handleToggleConversation = (conversationId: string) => {
    setSelectedConversations((prevSelected) => {
      if (prevSelected.includes(conversationId)) {
        return prevSelected.filter((id) => id !== conversationId);
      } else {
        return [...prevSelected, conversationId];
      }
    });
  };

  const isConversationSelected = (conversationId: string) => {
    return selectedConversations.includes(conversationId);
  };

  if (isLoadingConversations) return <NewChatSelectableUserListSkeleton />;

  return (
    <div className="flex-1 overflow-y-auto">
      <ul className="flex flex-col gap-2 p-4">
        {conversations?.map((conversation) => (
          <li key={conversation.id}>
            <NewChatSelectableUserListItem
              name={conversation.name}
              avatarColor={conversation.avatarColor}
              avatarUrl={conversation.avatarUrl}
              isSelected={isConversationSelected(conversation.id)}
              onToggle={() => handleToggleConversation(conversation.id)}
            />
          </li>
        ))}
      </ul>

      <div className="flex justify-end items-center p-4">
        {/* TODO: Criar um primary button */}
        <button className="bg-primary hover:bg-primary-hover text-white text-sm font-medium py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer">
          Continue
        </button>
      </div>
    </div>
  );
};
