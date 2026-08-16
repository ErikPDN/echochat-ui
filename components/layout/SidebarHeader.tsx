"use client";

import { MessageCircle, MessageSquarePlus } from "lucide-react";

interface SidebarHeaderProps {
  onNewChatClick: () => void;
}

export const SidebarHeader = ({ onNewChatClick }: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-primary">
          <MessageCircle className="h-4 w-4 text-white" strokeWidth={2.2} />
        </div>

        <span className="text-lg font-semibold">Echochat</span>
      </div>

      <button
        onClick={onNewChatClick}
        className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-zinc-600 transition-colors duration-300 cursor-pointer"
      >
        <MessageSquarePlus className="h-4 w-4 text-white" />
      </button>
    </div>
  );
};
