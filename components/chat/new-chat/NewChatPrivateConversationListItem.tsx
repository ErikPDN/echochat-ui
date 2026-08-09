"use client";

import Image from "next/image";

interface NewChatPrivateConversationListItemProps {
  name: string;
  avatarColor: string;
  avatarUrl?: string;
}

export const NewChatPrivateConversationListItem = ({
  name,
  avatarColor,
  avatarUrl,
}: NewChatPrivateConversationListItemProps) => {
  return (
    <button
      type="button"
      className="w-full flex items-center rounded-lg gap-3 px-4 py-3 text-left hover:bg-white/5 cursor-pointer"
    >
      {avatarUrl ? (
        <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
          <Image src={avatarUrl} alt={name} width={40} height={40} />
        </div>
      ) : (
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}

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
