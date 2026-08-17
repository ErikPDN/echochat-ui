"use client";

import { Conversation } from "@/lib/types/conversation";
import { ConversationListItem } from "./ConversationListItem";
import { ConversationListSkeleton } from "./ConversationListSkeleton";

interface ConversationListProps {
  conversations?: Conversation[];
  isLoading?: boolean;
  onSelectConversation: (conversationId: string) => void;
}

export const ConversationList = ({
  conversations,
  isLoading,
  onSelectConversation,
}: ConversationListProps) => {
  if (isLoading) {
    return <ConversationListSkeleton />;
  }

  return (
    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
      <ul className="flex flex-col gap-2 p-4">
        {conversations?.map((conversation) => (
          <li key={conversation.id}>
            <ConversationListItem
              name={conversation.name}
              lastMessage={conversation.lastMessage}
              time={conversation.time}
              avatarColor={conversation.avatarColor}
              avatarUrl={conversation.avatarUrl}
              unreadCount={conversation.unreadCount}
              isActive={conversation.isActive}
              onClick={() => onSelectConversation(conversation.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
