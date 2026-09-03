"use client";

import { ConversationHeader } from "@/components/chat/conversations/ConversationHeader";
import { useGetConversationsQuery } from "@/lib/hooks/chat";
import { useAuthStore } from "@/lib/store/auth-store";
import { mapConversationResponseToConversation } from "@/lib/utils/map-conversations";
import { MessageList } from "./MessageList";
import { useGetMessagesQuery } from "@/lib/hooks/chat/useGetMessagesQuery";
import { MessageComposer } from "./MessageComposer";

interface ChatConversationViewProps {
  conversationId: string;
}

export const ChatConversationView = ({
  conversationId,
}: ChatConversationViewProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const { data: conversations, isLoading: isConversationsLoading } =
    useGetConversationsQuery();
  const { data: messages, isLoading: isMessagesLoading } =
    useGetMessagesQuery(conversationId);

  const conversationResponse = conversations?.find(
    (conversation) => conversation.id === conversationId,
  );
  const conversation = conversationResponse
    ? mapConversationResponseToConversation(
        conversationResponse,
        currentUser?.id ?? "",
      )
    : undefined;

  if (isConversationsLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen text-gray-500 text-sm">
      <ConversationHeader
        conversation={conversation}
        isHeaderLoading={isConversationsLoading}
      />
      <MessageList
        conversationType={conversation?.type}
        messages={messages}
        isMessageListLoading={isMessagesLoading}
      />
      <MessageComposer conversationId={conversationId} />
    </div>
  );
};
