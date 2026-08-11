import { useMemo, useState } from "react";
import { Conversation } from "../types/conversation";

export const useConversationSearch = (conversations: Conversation[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = useMemo(() => {
    if (!conversations || !searchQuery.trim()) return conversations;

    const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
    return conversations.filter((conversation) =>
      conversation.name.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [conversations, searchQuery]);

  return { onSearch: setSearchQuery, filteredConversations };
};
