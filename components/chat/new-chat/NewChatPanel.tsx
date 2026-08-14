"use client";

import { ArrowLeft } from "lucide-react";

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
import { NewChatGroupForm } from "./NewChatGroupForm";
import { useConversationSearch } from "@/lib/hooks/useConversationSearch";
import { AnimatePresence, motion } from "framer-motion";
import { variants } from "@/lib/utils/variants";

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
        <motion.div
          key="options"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
          className="flex flex-col h-full"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 p-4">
              <button
                onClick={onBackClick}
                className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-zinc-600 transition-colors duration-300 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <span className="text-lg font-medium">New Chat</span>
            </div>

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
        </motion.div>
      )}
      {optionsView === "private-conversations" && (
        <motion.div
          key="private-conversations"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
          className="flex flex-col h-full"
        >
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
        </motion.div>
      )}
      {optionsView === "group-conversations" && (
        <motion.div
          key="group-conversations"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
          className="flex flex-col h-full"
        >
          <NewChatGroupForm
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};
