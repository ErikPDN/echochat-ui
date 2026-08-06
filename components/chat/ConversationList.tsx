"use client";

import { ConversationListItem } from "./ConversationListItem";

interface ConversationListProps {
  conversations: any[];
}

// TODO: Add skeleton loading state for conversation list
export const ConversationList = ({ conversations }: ConversationListProps) => {
  return (
    <ul className="flex flex-col gap-2 p-4">
      {conversations.map((conversation) => (
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
  );
};
