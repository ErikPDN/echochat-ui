"use client";

import { User } from "@/lib/types/user";
import { LogOut } from "lucide-react";
import Image from "next/image";

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
        <button
          type="button"
          className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold shrink-0 cursor-pointer"
        >
          {user?.avatarKey ? (
            <Image src={user.avatarKey} alt="Avatar" width={32} height={32} />
          ) : (
            user?.username.charAt(0).toUpperCase()
          )}
        </button>
        <div className="flex flex-col mt-1.5">
          <div className="text-xs font-medium">{user?.username}</div>
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
