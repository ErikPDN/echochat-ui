import { ConversationType } from "./conversation.response";

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
  lastMessage?: string;
  time?: string;
  unreadCount?: number;
  isActive?: boolean;
  members: ConversationMember[];
  createdAt: string;
  updatedAt: string;
}
