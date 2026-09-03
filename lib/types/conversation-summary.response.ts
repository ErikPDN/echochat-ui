export interface LastMessageSummary {
  messageId: string;
  content?: string;
  contentType: string;
  senderId: string;
  senderName: string;
  createdAt: Date;
}

export interface ConversationSummaryResponse {
  conversationId: string;
  lastMessage: LastMessageSummary | null;
  unreadCount: number;
}
