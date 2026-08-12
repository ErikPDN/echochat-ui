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
    <>
      {optionsView === "options" && (
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
            onSelectGroupOption={() => setOptionsView("group-conversations")}
            onSelectPrivateOption={() =>
              setOptionsView("private-conversations")
            }
          />

          <NewChatPrivateConversationList
            conversations={filteredConversations}
            isLoading={isLoadingConversations}
          />
        </div>
      )}
      {optionsView === "private-conversations" && (
        <NewChatPrivateForm
          onBackClick={() => setOptionsView("options")}
          onCreatePrivateConversation={(userId: string) =>
            createPrivateConversation({ userId })
          }
        />
      )}
      {optionsView === "group-conversations" && (
        <NewChatGroupForm
          onBackClick={() => setOptionsView("options")}
          onCreateGroupConversation={(groupName: string, members: string[]) =>
            createGroupConversation({ groupName, members })
          }
          conversations={conversations}
        />
      )}
    </>
  );
};
