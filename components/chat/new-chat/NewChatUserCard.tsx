"use client";

import { PublicUserResponse } from "@/lib/types/public-user.response";
import { stringToColor } from "@/lib/utils/string-to-color";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";

interface NewChatUserCardProps {
  user: PublicUserResponse;
  onCreatePrivateConversation: (userId: string) => void;
  isLoading: boolean;
}

export const NewChatUserCard = ({
  user,
  onCreatePrivateConversation,
  isLoading,
}: NewChatUserCardProps) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="w-full flex items-center rounded-lg gap-3 px-4 py-3 bg-zinc-800">
        {user.avatarUrl ? (
          <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
            <Image
              src={user.avatarUrl}
              alt={user.name}
              width={40}
              height={40}
            />
          </div>
        ) : (
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
            style={{ backgroundColor: stringToColor(user.name) }}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white truncate">
                {user.username}
              </span>
              <span className="text-xs text-zinc-400 text-left">
                {user.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onCreatePrivateConversation(user.id)}
              disabled={isLoading}
              className="bg-primary p-3 rounded-full hover:bg-primary-hover transition-colors duration-300 cursor-pointer"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <SendHorizonal className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
