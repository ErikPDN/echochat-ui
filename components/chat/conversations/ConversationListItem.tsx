"use client";

import { Avatar } from "@/components/ui/Avatar";
import { ConversationType } from "@/lib/enums/conversation-type";
import { useAuthStore } from "@/lib/store/auth-store";
import { LastMessageSummary } from "@/lib/types/conversation-summary.response";

interface ConversationListItemProps {
  name: string;
  lastMessageContent?: string;
  time?: string;
  avatarColor: string;
  avatarUrl?: string | null;
  senderName?: string;
  senderId?: string;
  unreadCount?: number;
  isActive?: boolean;
  onClick: () => void;
  type: ConversationType;
}

export const ConversationListItem = ({
  name,
  lastMessageContent,
  time,
  avatarColor,
  avatarUrl,
  senderName,
  senderId,
  unreadCount,
  isActive,
  type,
  onClick,
}: ConversationListItemProps) => {
  const user = useAuthStore((state) => state.user);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center rounded-lg gap-3 px-4 py-3 text-left hover:bg-white/5 cursor-pointer ${
        isActive ? "bg-white/5" : ""
      }`}
    >
      <Avatar name={name} avatarColor={avatarColor} avatarUrl={avatarUrl} />

      <div className="flex-1 min-w-0 space-y-1/2">
        <div className="flex justify-between items-baseline gap-2">
          <span className="text-sm font-medium truncate">{name}</span>
          <span className="text-xs text-gray-500 shrink-0">{time}</span>
        </div>

        <div className="flex justify-between items-center gap-1/2">
          <p className="text-[13px] font-medium text-gray-500 truncate">
            {!lastMessageContent
              ? "No messages yet"
              : type !== ConversationType.GROUP
                ? lastMessageContent
                : `${senderId === user?.id ? "You" : senderName}: ${lastMessageContent}`}
          </p>

          {!!unreadCount && (
            <span className="h-5 w-5 rounded-full bg-primary text-[10px] flex items-center justify-center shrink-0">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};
