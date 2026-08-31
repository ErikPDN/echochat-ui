"use client";

import { ContentType } from "@/lib/enums/content-type.enum";
import { useAuthStore } from "@/lib/store/auth-store";
import { formatMessageDate, getTimeString } from "@/lib/utils/date-formatter";

interface MessageListItemProps {
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
}

export const MessageListItem = ({
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
}: MessageListItemProps) => {
  const user = useAuthStore((state) => state.user);
  const isMine = senderId === user?.id;
  const currentMessageDate = formatMessageDate(new Date(createdAt));
  const previousMessageDate = previousCreatedAt
    ? formatMessageDate(new Date(previousCreatedAt))
    : null;
  const showDateSeparator = currentMessageDate !== previousMessageDate;

  return (
    <div
      key={messageId}
      className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
    >
      {showDateSeparator && (
        <div className="flex justify-center my-2 w-full">
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
        {/* TODO: Colocar cor no username */}
        <div className="flex flex-col">
          {!isMine && (
            <span className="text-sm text-white font-medium">{username}</span>
          )}
          <p className="text-sm text-white items-start">{content}</p>
        </div>
      </div>

      <span className="mt-1 px-1 text-[10px] text-zinc-500">
        {getTimeString(createdAt)}
      </span>
    </div>
  );
};
