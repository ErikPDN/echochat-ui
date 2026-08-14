"use client";

import { Avatar } from "@/components/ui/Avatar";

interface ConversationListItemProps {
  name: string;
  lastMessage?: string;
  time?: string;
  avatarColor: string;
  avatarUrl?: string;
  unreadCount?: number;
  isActive?: boolean;
}

export const ConversationListItem = ({
  name,
  lastMessage,
  time,
  avatarColor,
  avatarUrl,
  unreadCount,
  isActive,
}: ConversationListItemProps) => {
  return (
    <button
      type="button"
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
          <p className="text-xs font-medium text-gray-500 truncate">
            {lastMessage ? lastMessage : "No messages yet"}
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
