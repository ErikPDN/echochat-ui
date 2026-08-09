"use client";

import { Conversation } from "@/lib/types/conversation";
import { ConversationListItem } from "./ConversationListItem";
import { ConversationListSkeleton } from "./ConversationListSkeleton";

interface ConversationListProps {
  conversations?: Conversation[];
  isLoading?: boolean;
}

export const ConversationList = ({
  conversations,
  isLoading,
}: ConversationListProps) => {
  if (!isLoading) {
    return <ConversationListSkeleton />;
  }

  return (
    <div className="flex-1 overflow-y-auto">
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
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
