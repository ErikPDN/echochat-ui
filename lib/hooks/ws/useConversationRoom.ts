import { WS_EVENTS } from "@/lib/constants/ws-events";
import { getSocketInstance } from "@/lib/socket/socket-client";
import { useEffect } from "react";

export const useConversationRoom = (conversationId?: string) => {
  useEffect(() => {
    if (!conversationId) return;

    const socket = getSocketInstance();
    socket.emit(WS_EVENTS.CONVERSATION_JOIN, conversationId);

    return () => {
      socket.emit(WS_EVENTS.CONVERSATION_LEAVE, conversationId);
    };
  }, [conversationId]);
};
