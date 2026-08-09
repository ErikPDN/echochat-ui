"use client";

import { Conversation } from "@/lib/types/conversation";
import { NewChatPrivateConversationListItem } from "./NewChatPrivateConversationListItem";
import { NewChatPrivateConversationListSkeleton } from "./NewChatPrivateConversationListSkeleton";

interface NewChatPrivateConversationListProps {
  conversations?: Conversation[];
  isLoading?: boolean;
}

export const NewChatPrivateConversationList = ({
  conversations,
  isLoading,
}: NewChatPrivateConversationListProps) => {
  if (!isLoading) return <NewChatPrivateConversationListSkeleton />;

  return (
    <div className="flex-1 overflow-y-auto mt-1/2">
      <ul className="flex flex-col gap-2 p-4">
        <span className="text-sm font-medium text-zinc-400 ml-2">
          Private Conversations
        </span>

        {conversations?.map((conversation) => (
          <li key={conversation.id}>
            <NewChatPrivateConversationListItem
              name={conversation.name}
              avatarColor={conversation.avatarColor}
              avatarUrl={conversation.avatarUrl}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
