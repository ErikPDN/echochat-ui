export interface Conversation {
  id: string;
  name: string;
  lastMessage?: string;
  time?: string;
  avatarColor: string;
  avatarUrl?: string;
  unreadCount?: number;
  isActive?: boolean;
}
