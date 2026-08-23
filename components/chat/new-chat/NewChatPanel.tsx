"use client";

import {
  useCreatePrivateConversationMutation,
  useCreateGroupConversationMutation,
} from "@/lib/hooks/chat";
import { NewChatOptions } from "./NewChatOptions";
import { NewChatPrivateConversationList } from "./NewChatPrivateConversationList";
import { SearchBar } from "@/components/ui/SearchBar";
import { useState } from "react";
import { NewChatPrivateForm } from "./NewChatPrivateForm";
import { NewChatGroupOption } from "./NewChatGroupOption";
import { AnimatePresence } from "framer-motion";
import { SlidePanel } from "@/components/ui/SlidePanel";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { useContacts } from "@/lib/hooks/chat/useContacts";
import { useSearch } from "@/lib/hooks/useSearch";
import { Conversation } from "@/lib/types/conversation";
import { useRouter } from "next/navigation";

interface NewChatPanelProps {
  onBackClick: () => void;
  conversations?: Conversation[];
  isLoadingConversations?: boolean;
}

export const NewChatPanel = ({
  onBackClick,
  conversations,
  isLoadingConversations,
}: NewChatPanelProps) => {
  const router = useRouter();
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [optionsView, setOptionsView] = useState<
    "options" | "private-conversations" | "group-conversations"
  >("options");
  const { mutate: createGroupConversation, isPending: isCreatingGroup } =
    useCreateGroupConversationMutation();
  const { mutate: createPrivateConversation, isPending: isCreatingPrivate } =
    useCreatePrivateConversationMutation();
  const { contacts, isLoading: isLoadingContacts } = useContacts();
  const { onSearch, filteredItems: filteredConversations } =
    useSearch<Conversation>(conversations ?? []);

  const handleSelectConversation = (conversationId: string) => {
    router.push(`/chat/${conversationId}`);
    onBackClick();
  };

  const handleCreatePrivateConversation = (memberId: string) => {
    createPrivateConversation(
      { memberId },
      {
        onSuccess: () => {
          onBackClick();
        },
      },
    );
  };

  const handleCreateGroupConversation = (
    groupName: string,
    memberIds: string[],
    file?: File,
  ) => {
    createGroupConversation(
      { groupName, memberIds, file },
      {
        onSuccess: () => {
          onBackClick();
        },
      },
    );
  };

  return (
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      {optionsView === "options" && (
        <SlidePanel key="options" direction={direction}>
          <div className="flex flex-col">
            <PanelHeader onBackClick={onBackClick} title="New Chat" />

            <SearchBar placeholder="Search for username" onSearch={onSearch} />

            <NewChatOptions
              onSelectGroupOption={() => {
                setDirection("right");
                setOptionsView("group-conversations");
              }}
              onSelectPrivateOption={() => {
                setDirection("right");
                setOptionsView("private-conversations");
              }}
            />

            <NewChatPrivateConversationList
              conversations={filteredConversations}
              isLoading={isLoadingConversations}
              onSelectConversation={handleSelectConversation}
            />
          </div>
        </SlidePanel>
      )}
      {optionsView === "private-conversations" && (
        <SlidePanel key="private-conversations" direction={direction}>
          <NewChatPrivateForm
            onBackClick={() => {
              setDirection("left");
              setOptionsView("options");
            }}
            onCreatePrivateConversation={handleCreatePrivateConversation}
            isCreating={isCreatingPrivate}
          />
        </SlidePanel>
      )}
      {optionsView === "group-conversations" && (
        <SlidePanel key="group-conversations" direction={direction}>
          <NewChatGroupOption
            onBackClick={() => {
              setDirection("left");
              setOptionsView("options");
            }}
            onCreateGroupConversation={handleCreateGroupConversation}
            contacts={contacts}
            isCreating={isCreatingGroup}
            isLoadingContacts={isLoadingContacts}
          />
        </SlidePanel>
      )}
    </AnimatePresence>
  );
};
