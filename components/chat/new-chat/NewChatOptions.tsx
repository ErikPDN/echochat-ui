"use client";

import { Users, User } from "lucide-react";

interface NewChatOptionsProps {
  onSelectGroupOption: () => void;
  onSelectPrivateOption: () => void;
}

export const NewChatOptions = ({
  onSelectGroupOption,
  onSelectPrivateOption,
}: NewChatOptionsProps) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <button
        type="button"
        onClick={onSelectGroupOption}
        className="w-full flex items-center rounded-lg gap-3 py-3 px-4 text-left hover:bg-white/5 cursor-pointer"
      >
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
          <Users className="h-5 w-5" />
        </div>

        <span className="text-sm font-medium">New Group</span>
      </button>

      <button
        type="button"
        onClick={onSelectPrivateOption}
        className="w-full flex items-center rounded-lg gap-3 py-3 px-4 text-left hover:bg-white/5 cursor-pointer"
      >
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
          <User className="h-5 w-5" />
        </div>

        <span className="text-sm font-medium">New Private Chat</span>
      </button>
    </div>
  );
};
