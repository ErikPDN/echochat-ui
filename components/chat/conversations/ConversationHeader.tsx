"use client";

import { Conversation } from "@/lib/types/conversation";
import { Avatar } from "../../ui/Avatar";
import { EllipsisVertical } from "lucide-react";
import { ConversationHeaderSkeleton } from "./ConversationHeaderSkeleton";

interface ConversationHeaderProps {
  conversation?: Conversation;
  isHeaderLoading?: boolean;
}

export const ConversationHeader = ({
  conversation,
  isHeaderLoading = false,
}: ConversationHeaderProps) => {
  const name = conversation?.name ?? "Unknown";
  const avatarColor = conversation?.avatarColor ?? "#6366f1";
  const avatarUrl = conversation?.avatarUrl ?? undefined;
  const members = conversation?.members ?? [];

  if (isHeaderLoading) return <ConversationHeaderSkeleton />;

  return (
    <header className="sticky h-16 top-0 z-50 w-full border-b border-card-border bg-card">
      <div className="flex h-full items-center justify-between gap-3 px-4 py-2">
        <div className="flex items-center gap-3">
          <Avatar name={name} avatarColor={avatarColor} avatarUrl={avatarUrl} />

          <div className="flex flex-col">
            <span className="text-md font-semibold text-white truncate">
              {name}
            </span>
            {conversation?.type === "group" && (
              <div className="flex gap-1 text-sm text-gray-400 truncate">
                {members.map((member, i) => (
                  <span key={member.userId}>
                    {member.name}
                    {i < members.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-600 transition-colors duration-300 cursor-pointer">
          <EllipsisVertical className="text-white" />
        </button>
      </div>
    </header>
  );
};
