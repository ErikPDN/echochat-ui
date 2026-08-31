import { ContentType } from "../enums/content-type.enum";
import { Recipient } from "./recipient";

export interface Message {
  messageId: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderUsername: string;
  senderAvatarUrl?: string | null;
  recipients: Recipient[];
  content?: string;
  contentType: ContentType;
  fileIds?: string[];
  createdAt: Date;
  updatedAt: Date;
}
