import { Conversation } from "../types/conversation";
import {
  ConversationResponse,
  ConversationType,
} from "../types/conversation.response";
import { stringToColor } from "./string-to-color";

export const mapConversationResponseToConversation = (
  dto: ConversationResponse,
  currentUserId: string,
): Conversation => {
  const otherMember = dto.members.find(
    (member) => member.userId !== currentUserId,
  );

  const name =
    dto.type === ConversationType.GROUP
      ? dto.name || "Unnamed Group"
      : otherMember?.name || "Unknown User";

  return {
    id: dto.id,
    name,
    avatarColor: stringToColor(
      dto.type === ConversationType.GROUP
        ? dto.name || dto.id
        : otherMember?.userId || "",
    ),
  };
};
