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

  const sortedConversations = [...(conversations ?? [])].sort((a, b) => {
    const tA = new Date(a.lastMessageAt ?? a.createdAt).getTime() || 0;
    const tB = new Date(b.lastMessageAt ?? b.createdAt).getTime() || 0;
    if (tB !== tA) return tB - tA;
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
      <ul className="flex flex-col gap-2 p-4">
        {sortedConversations?.map((conversation) => (
          <li key={conversation.id}>
            <ConversationListItem
              type={conversation.type}
              name={conversation.name}
              lastMessageContent={conversation.lastMessageContent}
              time={conversation.time}
              avatarColor={conversation.avatarColor}
              avatarUrl={conversation.avatarUrl}
              unreadCount={conversation.unreadCount}
              isActive={activeConversationId === conversation.id}
              senderId={conversation.senderId}
              senderName={conversation.senderName}
              onClick={() => onSelectConversation(conversation.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
