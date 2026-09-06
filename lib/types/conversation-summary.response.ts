import { ContentType } from "../enums/content-type.enum";

export interface LastMessageSummary {
  messageId: string;
  content?: string;
  contentType: ContentType;
  senderId: string;
  senderName: string;
  createdAt: Date;
}

export interface ConversationSummaryResponse {
  conversationId: string;
  lastMessage: LastMessageSummary | null;
  unreadCount: number;
}
