"use client";

import { useState } from "react";

import { SearchBar } from "../ui/SearchBar";
import { ConversationList } from "../chat/conversations/ConversationList";
import { useAuthStore } from "@/lib/store/auth-store";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useLogoutMutation } from "@/lib/hooks/auth/useLogoutMutation";
import { useGetConversationsQuery } from "@/lib/hooks/chat";
import { mapConversationResponseToConversation } from "@/lib/utils/map-conversations";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";
import { NewChatPanel } from "../chat/new-chat/NewChatPanel";
import { AnimatePresence } from "framer-motion";
import { useSearch } from "@/lib/hooks/useSearch";
import { SlidePanel } from "../ui/SlidePanel";
import { Conversation } from "@/lib/types/conversation";
import { usePathname, useRouter } from "next/navigation";
import { ProfilePanel } from "../chat/profile/ProfilePanel";
import { ConversationType } from "@/lib/enums/conversation-type";

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isProfileRoute = pathname.startsWith("/profile");

  const [view, setView] = useState<"conversations" | "new-chat" | "profile">(
    "conversations",
  );
  const activeView = isProfileRoute ? "profile" : view;

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const { mutate: logout, isPending } = useLogoutMutation();
  const { data: conversations, isLoading } = useGetConversationsQuery();
  const user = useAuthStore((state) => state.user);
  const { onSearch, filteredItems: filteredConversations } =
    useSearch<Conversation>(
      conversations?.map((conversation) =>
        mapConversationResponseToConversation(conversation, user?.id ?? ""),
      ) ?? [],
    );

  const privateConversations =
    conversations
      ?.filter((conversation) => conversation.type === ConversationType.PRIVATE)
      .map((conversation) =>
        mapConversationResponseToConversation(conversation, user?.id ?? ""),
      ) ?? [];

  const handleLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
  };

  const handleSelectConversation = (conversationId: string) => {
    router.push(`/chat/${conversationId}`);
  };

  const handleProfileClick = () => {
    router.push("/profile/avatar");
    setDirection("right");
  };

  return (
    <aside className="relative w-96 border-r border-card-border bg-card flex flex-col shrink-0 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        {activeView === "conversations" && (
          <SlidePanel key="conversations" direction={direction}>
            <SidebarHeader
              onNewChatClick={() => {
                setDirection("right");
                setView("new-chat");
              }}
            />
            <SearchBar onSearch={onSearch} />
            <ConversationList
              conversations={filteredConversations}
              isLoading={isLoading}
              onSelectConversation={handleSelectConversation}
            />
            <SidebarFooter
              user={user}
              setIsLogoutDialogOpen={setIsLogoutDialogOpen}
              onProfileClick={handleProfileClick}
            />
          </SlidePanel>
        )}
        {activeView === "new-chat" && (
          <SlidePanel key="new-chat" direction={direction}>
            <NewChatPanel
              onBackClick={() => {
                setDirection("left");
                setView("conversations");
              }}
              conversations={privateConversations}
              isLoadingConversations={isLoading}
            />
          </SlidePanel>
        )}
        {activeView === "profile" && (
          <SlidePanel key="profile" direction={direction}>
            <ProfilePanel
              onBackClick={() => {
                setDirection("left");
                setView("conversations");
                router.push("/");
              }}
            />
          </SlidePanel>
        )}
      </AnimatePresence>

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
