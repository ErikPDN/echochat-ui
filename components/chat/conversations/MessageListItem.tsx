"use client";

import { ContentType } from "@/lib/enums/content-type.enum";
import { ConversationType } from "@/lib/enums/conversation-type";
import { useAuthStore } from "@/lib/store/auth-store";
import { formatMessageDate, getTimeString } from "@/lib/utils/date-formatter";

interface MessageListItemProps {
  conversationType?: ConversationType;
  messageIndex: number;
  messageId: string;
  senderId: string;
  username: string;
  avatarUrl?: string | null;
  content?: string;
  contentType: ContentType;
  fileIds?: string[];
  createdAt: Date;
  previousCreatedAt?: Date;
  updatedAt?: Date;
  senderColor: string;
}

export const MessageListItem = ({
  conversationType,
  messageIndex,
  messageId,
  senderId,
  username,
  avatarUrl,
  content,
  contentType,
  fileIds,
  createdAt,
  previousCreatedAt,
  updatedAt,
  senderColor,
}: MessageListItemProps) => {
  const user = useAuthStore((state) => state.user);
  const isMine = senderId === user?.id;
  const currentMessageDate = formatMessageDate(new Date(createdAt));
  const previousMessageDate = previousCreatedAt
    ? formatMessageDate(new Date(previousCreatedAt))
    : null;
  const showDateSeparator = currentMessageDate !== previousMessageDate;
  const isPrivateConversation = conversationType === ConversationType.PRIVATE;

  return (
    <div
      key={messageId}
      className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
    >
      {showDateSeparator && (
        <div className="flex justify-center my-3 w-full">
          <span className="text-xs text-zinc-600 font-medium bg-card py-1 px-3 rounded-lg border border-zinc-800">
            {currentMessageDate}
          </span>
        </div>
      )}
      <div
        className={`max-w-md min-w-16 px-3 py-2 rounded-xl ${
          isMine ? "bg-primary rounded-br-none" : "bg-zinc-800 rounded-bl-none"
        }`}
      >
        <div className="flex flex-col">
          {!isPrivateConversation && !isMine && (
            <span
              className="mb-0.5 text-sm font-medium leading-tight"
              style={{ color: senderColor }}
            >
              {username}
            </span>
          )}
          <p className="text-sm text-white">{content}</p>
        </div>
      </div>

      <span className="mt-1 px-1 text-[10px] text-zinc-500">
        {getTimeString(createdAt)}
      </span>
    </div>
  );
};
