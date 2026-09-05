"use client";

import { ConversationHeader } from "@/components/chat/conversations/ConversationHeader";
import { useGetConversationsQuery } from "@/lib/hooks/chat";
import { useAuthStore } from "@/lib/store/auth-store";
import { mapConversationResponseToConversation } from "@/lib/utils/map-conversations";
import { MessageList } from "./MessageList";
import { useGetMessagesQuery } from "@/lib/hooks/chat/useGetMessagesQuery";
import { MessageComposer } from "./MessageComposer";
import { useGetMessagesSummaryQuery } from "@/lib/hooks/chat/useGetMessagesSummaryQuery";
import { useReadMessageMutation } from "@/lib/hooks/chat/useReadMessageMutation";
import { useEffect } from "react";

interface ChatConversationViewProps {
  conversationId: string;
}

export const ChatConversationView = ({
  conversationId,
}: ChatConversationViewProps) => {
  const currentUser = useAuthStore((state) => state.user);
  const { data: conversations, isLoading: isConversationsLoading } =
    useGetConversationsQuery();
  const { data: messages, isLoading: isMessagesLoading } = useGetMessagesQuery(
    conversationId,
    50,
  );
  const { data: messagesSummary } = useGetMessagesSummaryQuery(
    conversations?.map((conversation) => conversation.id) ?? [],
  );
  const { mutate: markMessagesAsRead } = useReadMessageMutation();

  const conversationResponse = conversations?.find(
    (conversation) => conversation.id === conversationId,
  );

  const summary = messagesSummary?.find(
    (summary) => summary.conversationId === conversationId,
  );

  const conversation = conversationResponse
    ? mapConversationResponseToConversation(
        conversationResponse,
        currentUser?.id ?? "",
        summary,
      )
    : undefined;

  useEffect(() => {
    if (conversation && (conversation.unreadCount ?? 0) > 0) {
      markMessagesAsRead(conversationId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, conversation?.unreadCount, markMessagesAsRead]);

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
