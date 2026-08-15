"use client";

import {
  useCreatePrivateConversationMutation,
  useCreateGroupConversationMutation,
} from "@/lib/hooks/chat";
import { NewChatOptions } from "./NewChatOptions";
import { NewChatPrivateConversationList } from "./NewChatPrivateConversationList";
import { Conversation } from "@/lib/types/conversation";
import { SearchBar } from "@/components/ui/SearchBar";
import { useState } from "react";
import { NewChatPrivateForm } from "./NewChatPrivateForm";
import { NewChatGroupOption } from "./NewChatGroupOption";
import { useConversationSearch } from "@/lib/hooks/useConversationSearch";
import { AnimatePresence, motion } from "framer-motion";
import { SlidePanel } from "@/components/ui/SlidePanel";
import { PanelHeader } from "@/components/ui/PanelHeader";

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
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [optionsView, setOptionsView] = useState<
    "options" | "private-conversations" | "group-conversations"
  >("options");
  const { mutate: createGroupConversation, isPending: isCreatingGroup } =
    useCreateGroupConversationMutation();
  const { mutate: createPrivateConversation, isPending: isCreatingPrivate } =
    useCreatePrivateConversationMutation();
  const { onSearch, filteredConversations } = useConversationSearch(
    conversations ?? [],
  );

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
            onCreatePrivateConversation={(memberId: string) =>
              createPrivateConversation({ memberId })
            }
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
            onCreateGroupConversation={(groupName: string, members: string[]) =>
              createGroupConversation({ groupName, members })
            }
            conversations={filteredConversations}
            isCreating={isCreatingGroup}
            isLoadingConversations={isLoadingConversations}
          />
        </SlidePanel>
      )}
    </AnimatePresence>
  );
};
