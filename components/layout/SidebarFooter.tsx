"use client";

import { User } from "@/lib/types/user";
import { LogOut } from "lucide-react";

interface SidebarFooterProps {
  user: User | null;
  setIsLogoutDialogOpen: (open: boolean) => void;
}

export const SidebarFooter = ({
  user,
  setIsLogoutDialogOpen,
}: SidebarFooterProps) => {
  return (
    <div className="w-full border border-t border-card-border p-3 flex items-center justify-between">
      <div className="flex items-center justify-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-semibold shrink-0">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-medium">{user?.username}</div>
          <div className="text-xs text-gray-500">Online</div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsLogoutDialogOpen(true)}
        className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-zinc-600 transition-colors duration-300 cursor-pointer"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
};
