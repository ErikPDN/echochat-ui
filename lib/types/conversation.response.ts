import { ConversationType } from "../enums/conversation-type";
import { ConversationMemberResponse } from "./conversation-member-response";

export interface ConversationResponse {
  id: string;
  type: ConversationType;
  name: string | null;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  members: ConversationMemberResponse[];
}
