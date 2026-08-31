"use client";

import { ContentType } from "@/lib/enums/content-type.enum";
import { useAuthStore } from "@/lib/store/auth-store";

interface MessageListItemProps {
  messageId: string;
  senderId: string;
  username: string;
  avatarUrl?: string | null;
  content?: string;
  contentType: ContentType;
  fileIds?: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export const MessageListItem = ({
  messageId,
  senderId,
  username,
  avatarUrl,
  content,
  contentType,
  fileIds,
  createdAt,
  updatedAt,
}: MessageListItemProps) => {
  const user = useAuthStore((state) => state.user);
  const isMine = senderId === user?.id;

  const timeString = new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      key={messageId}
      className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-md min-w-16 px-3 py-2 rounded-xl ${
          isMine ? "bg-primary rounded-br-none" : "bg-zinc-800 rounded-bl-none"
        }`}
      >
        <div className="flex flex-col gap-1">
          {!isMine && (
            <span className="text-sm text-white font-medium">{username}</span>
          )}
          <p className="text-sm text-white items-start">{content}</p>
        </div>
      </div>

      <span className="mt-1 px-1 text-[10px] text-zinc-500">{timeString}</span>
    </div>
  );
};
