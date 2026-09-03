import { ConversationType } from "../enums/conversation-type";
import { Conversation } from "../types/conversation";
import { ConversationSummaryResponse } from "../types/conversation-summary.response";
import { ConversationResponse } from "../types/conversation.response";
import { formatConversationTime } from "./date-formatter";
import { stringToColor } from "./string-to-color";

export const mapConversationResponseToConversation = (
  dto: ConversationResponse,
  currentUserId: string,
  summary?: ConversationSummaryResponse,
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
    members: dto.members.map((member) => ({
      userId: member.userId,
      username: member.username,
      name: member.name,
      avatarColor: stringToColor(member.userId),
      avatarUrl: member.avatarUrl,
    })),
    type: dto.type,
    name,
    avatarUrl:
      dto.type === ConversationType.GROUP
        ? dto.avatarUrl || null
        : otherMember?.avatarUrl || null,
    avatarColor: stringToColor(
      dto.type === ConversationType.GROUP
        ? dto.name || dto.id
        : otherMember?.userId || "",
    ),
    senderName: summary?.lastMessage?.senderName,
    senderId: summary?.lastMessage?.senderId,
    lastMessageContent: summary?.lastMessage?.content,
    lastMessageAt: summary?.lastMessage?.createdAt,
    unreadCount: summary?.unreadCount ?? 0,
    time: summary?.lastMessage?.createdAt
      ? formatConversationTime(new Date(summary.lastMessage.createdAt))
      : undefined,
    createdAt: new Date(dto.createdAt).toISOString(),
    updatedAt: new Date(dto.updatedAt).toISOString(),
  };
};
