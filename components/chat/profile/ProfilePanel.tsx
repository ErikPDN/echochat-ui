"use client";

import { Avatar } from "@/components/ui/Avatar";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { useMeQuery } from "@/lib/hooks/auth/useMeQuery";
import { useState } from "react";

interface ProfilePanelProps {
  onBackClick: () => void;
}

export const ProfilePanel = ({ onBackClick }: ProfilePanelProps) => {
  const [isActive, setIsActive] = useState(false);
  const { data: user, isLoading: isLoadingUser, error } = useMeQuery();

  return (
    <div className="flex flex-col space-y-2">
      <PanelHeader onBackClick={onBackClick} title="Profile" />

      <div className="mx-4">
        <button
          type="button"
          onClick={() => setIsActive((prev) => !prev)}
          className={`w-full flex items-center rounded-lg gap-3 px-4 py-3 text-left hover:bg-white/5 cursor-pointer transition-colors duration-200 ${
            isActive ? "bg-white/5" : ""
          }`}
        >
          <Avatar
            name={user?.name ?? "Unknown"}
            avatarColor="#6366f1"
            avatarKey={user?.avatarKey}
          />

          <div className="flex-1 min-w-0 space-y-0.5">
            <div className="flex flex-col">
              <span className="text-sm font-medium truncate">
                {user?.username}
              </span>
              <span className="text-xs text-gray-400 shrink-0">
                {user?.email}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
