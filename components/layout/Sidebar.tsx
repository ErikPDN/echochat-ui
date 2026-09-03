"use client";

import { useMemo, useState } from "react";

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
import { useParams, usePathname, useRouter } from "next/navigation";
import { ProfilePanel } from "../chat/profile/ProfilePanel";
import { ConversationType } from "@/lib/enums/conversation-type";
import { useGetMessagesSummary } from "@/lib/hooks/chat/useGetMessagesSummary";
import { ConversationSummaryResponse } from "@/lib/types/conversation-summary.response";

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
  const { data: messagesSummary } = useGetMessagesSummary(
    conversations?.map((conversation) => conversation.id) ?? [],
  );

  const user = useAuthStore((state) => state.user);

  const summaryById = useMemo(() => {
    const map = new Map<string, ConversationSummaryResponse>();
    messagesSummary?.forEach((summary) => {
      map.set(summary.conversationId, summary);
    });
    return map;
  }, [messagesSummary]);

  const mappedSummary = useMemo<Conversation[]>(() => {
    return (
      conversations?.map((conversation) =>
        mapConversationResponseToConversation(
          conversation,
          user?.id ?? "",
          summaryById.get(conversation.id),
        ),
      ) ?? []
    );
  }, [summaryById, conversations, user?.id]);

  const { onSearch, filteredItems: filteredConversations } =
    useSearch<Conversation>(mappedSummary);

  const privateConversations = useMemo(() => {
    return mappedSummary.filter(
      (conversation) => conversation.type === ConversationType.PRIVATE,
    );
  }, [mappedSummary]);

  const chatParams = useParams<{ conversationId: string }>();

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
              activeConversationId={chatParams?.conversationId}
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
