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

interface NewChatPanelProps {
  onBackClick: () => void;
  conversations?: Conversation[];
  isLoadingConversations?: boolean;
}

// TODO: botar uma animação de slide left-right quando o painel de nova conversa abrir e fechar
export const NewChatPanel = ({
  onBackClick,
  conversations,
  isLoadingConversations,
}: NewChatPanelProps) => {
  const { mutate: createGroupConversation, isPending: isCreatingGroup } =
    useCreateGroupConversationMutation();
  const { mutate: createPrivateConversation, isPending: isCreatingPrivate } =
    useCreatePrivateConversationMutation();

  return (
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

      <SearchBar placeholder="Search for username or id" />

      <NewChatOptions
        onCreateGroupConversation={createGroupConversation}
        onCreatePrivateConversation={createPrivateConversation}
      />

      <NewChatPrivateConversationList
        conversations={conversations}
        isLoading={isLoadingConversations}
      />
    </div>
  );
};
