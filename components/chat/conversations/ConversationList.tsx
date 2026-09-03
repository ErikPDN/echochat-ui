"use client";

import { Conversation } from "@/lib/types/conversation";
import { ConversationListItem } from "./ConversationListItem";
import { ConversationListSkeleton } from "./ConversationListSkeleton";

interface ConversationListProps {
  conversations?: Conversation[];
  isLoading?: boolean;
  onSelectConversation: (conversationId: string) => void;
  activeConversationId?: string;
}

export const ConversationList = ({
  conversations,
  isLoading,
  onSelectConversation,
  activeConversationId,
}: ConversationListProps) => {
  if (isLoading) {
    return <ConversationListSkeleton />;
  }

  const sortedConversations = conversations?.sort((a, b) => {
    const createdAtA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const createdAtB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return createdAtB - createdAtA;
  });

  return (
    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
      <ul className="flex flex-col gap-2 p-4">
        {sortedConversations?.map((conversation) => (
          <li key={conversation.id}>
            <ConversationListItem
              name={conversation.name}
              lastMessage={conversation.lastMessage}
              time={conversation.time}
              avatarColor={conversation.avatarColor}
              avatarUrl={conversation.avatarUrl}
              unreadCount={conversation.unreadCount}
              isActive={activeConversationId === conversation.id}
              senderName={conversation.senderName}
              onClick={() => onSelectConversation(conversation.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
