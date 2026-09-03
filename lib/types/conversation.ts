import { ConversationType } from "../enums/conversation-type";

export interface ConversationMember {
  userId: string;
  username: string;
  name: string;
  avatarColor: string;
  avatarUrl?: string;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  name: string;
  avatarColor: string;
  avatarUrl?: string | null;
  lastMessageContent?: string;
  lastMessageAt?: Date;
  time?: string;
  unreadCount?: number;
  senderName?: string;
  senderId?: string;
  members: ConversationMember[];
  createdAt: string;
  updatedAt: string;
}
