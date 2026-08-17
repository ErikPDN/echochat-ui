"use client";

import { Avatar } from "@/components/ui/Avatar";

interface NewChatPrivateConversationListItemProps {
  name: string;
  avatarColor: string;
  avatarUrl?: string;
  onClick?: () => void;
}

export const NewChatPrivateConversationListItem = ({
  name,
  avatarColor,
  avatarUrl,
  onClick,
}: NewChatPrivateConversationListItemProps) => {
  return (
    <button
      type="button"
      className="w-full flex items-center rounded-lg gap-3 px-4 py-3 text-left hover:bg-white/5 cursor-pointer"
      onClick={onClick}
    >
      <Avatar name={name} avatarColor={avatarColor} avatarKey={avatarUrl} />

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-white truncate">
            {name}
          </span>
        </div>
      </div>
    </button>
  );
};
