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
import { motion, AnimatePresence } from "framer-motion";
import { ConversationType } from "@/lib/types/conversation.response";
import { useConversationSearch } from "@/lib/hooks/useConversationSearch";

export const Sidebar = () => {
  const [view, setView] = useState<"conversations" | "new-chat">(
    "conversations",
  );
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const { mutate: logout, isPending } = useLogoutMutation();
  const { data: conversations, isLoading } = useGetConversationsQuery();
  const { onSearch, filteredConversations } = useConversationSearch(
    conversations?.map((conversation) =>
      mapConversationResponseToConversation(conversation, user?.id ?? ""),
    ) ?? [],
  );

  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
  };

  const variants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? "100%" : "-100%",
    }),
    center: { x: 0 },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? "-100%" : "100%",
    }),
  };

  const privateConversations =
    conversations
      ?.filter((conversation) => conversation.type === ConversationType.PRIVATE)
      .map((conversation) =>
        mapConversationResponseToConversation(conversation, user?.id ?? ""),
      ) ?? [];

  return (
    <aside className="relative w-96 border-r border-card-border bg-card flex flex-col shrink-0 overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        {view === "conversations" ? (
          <motion.div
            key="conversations"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col h-full"
          >
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
            />
            <SidebarFooter
              user={user}
              setIsLogoutDialogOpen={setIsLogoutDialogOpen}
            />
          </motion.div>
        ) : (
          <motion.div
            key="new-chat"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col h-full"
          >
            <NewChatPanel
              onBackClick={() => {
                setDirection("left");
                setView("conversations");
              }}
              conversations={privateConversations}
              isLoadingConversations={isLoading}
            />
          </motion.div>
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
