import { WS_EVENTS } from "@/lib/constants/ws-events";
import { getSocketInstance } from "@/lib/socket/socket-client";
import { useAuthStore } from "@/lib/store/auth-store";
import { Message } from "@/lib/types/message";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useConversationsListener = () => {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    const socket = getSocketInstance();

    const handleMessage = (message: Message) => {
      queryClient.setQueryData<Message[]>(
        ["messages", message.conversationId],
        (prevMessage) => {
          if (!prevMessage) return [message];
          if (prevMessage.some((m) => m.messageId === message.messageId))
            return [...prevMessage];
          return [...prevMessage, message];
        },
      );
      queryClient.invalidateQueries({ queryKey: ["messages-summary"] });
    };

    socket.on(WS_EVENTS.MESSAGE_NEW, handleMessage);
    return () => {
      socket.off(WS_EVENTS.MESSAGE_NEW, handleMessage);
    };
  }, [queryClient, accessToken]);
};
