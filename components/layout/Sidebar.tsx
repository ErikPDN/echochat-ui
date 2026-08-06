"use client";

import { useState } from "react";

import { MessageCircle, MessageSquarePlus, LogOut } from "lucide-react";
import { SearchBar } from "../ui/SearchBar";
import { ConversationList } from "../chat/ConversationList";
import { useAuthStore } from "@/lib/store/auth-store";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useLogoutMutation } from "@/lib/hooks/auth/useLogoutMutation";

const mockConversations = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    avatarColor: "#FF5733",
    avatarUrl: "",
    unreadCount: 2,
    isActive: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Let's catch up later.",
    time: "9:15 AM",
    avatarColor: "#33C1FF",
    avatarUrl: "",
    unreadCount: 0,
    isActive: false,
  },
  {
    id: 3,
    name: "Alice Johnson",
    lastMessage: "Can you send me the report?",
    time: "Yesterday",
    avatarColor: "#8E44AD",
    avatarUrl: "",
    unreadCount: 5,
    isActive: false,
  },
  {
    id: 4,
    name: "Bob Brown",
    lastMessage: "Thanks for your help!",
    time: "2 days ago",
    avatarColor: "#27AE60",
    avatarUrl: "",
    unreadCount: 0,
    isActive: false,
  },
];

export const Sidebar = () => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { mutate: logout, isPending, error } = useLogoutMutation(); // TODO: criar um toast e exibir a mensagem de erro

  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
  };

  return (
    <aside className="w-96 border-r border-card-border bg-card flex flex-col shrink-0">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary">
            <MessageCircle className="h-4 w-4 text-white" strokeWidth={2.2} />
          </div>

          <span className="text-lg font-semibold">Pulse</span>
        </div>

        <button
          onClick={() => {}}
          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-zinc-600 transition-colors duration-300 cursor-pointer"
        >
          <MessageSquarePlus className="h-4 w-4 text-white" />
        </button>
      </div>

      <SearchBar />

      <div className="flex-1 overflow-y-auto">
        <ConversationList conversations={mockConversations} />
      </div>

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
          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-zinc-600 transitions-colors duration-300 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>

      <ConfirmDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmLabel="Logout"
        cancelLabel="Cancel"
        onConfirm={handleLogout}
        variant="destructive"
        isLoading={isPending}
      />
    </aside>
  );
};
