import { ConversationMemberResponse } from "./conversation-member-response";

export enum ConversationType {
  PRIVATE = "private",
  GROUP = "group",
}

export interface ConversationResponse {
  id: string;
  type: ConversationType;
  name: string | null;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  members: ConversationMemberResponse[];
}
