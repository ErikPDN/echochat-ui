import { Conversation } from "@/lib/types/conversation";
import { NewChatSelectableUserListItem } from "./NewChatSelectableUserListItem";
import { NewChatSelectableUserListSkeleton } from "./NewChatSelectableUserListSkeleton";
import { useState } from "react";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";

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
      <ul className="flex flex-col gap-2 px-4 py-2">
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
    </div>
  );
};
