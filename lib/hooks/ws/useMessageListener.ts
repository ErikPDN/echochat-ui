import { WS_EVENTS } from "@/lib/constants/ws-events";
import { getSocketInstance } from "@/lib/socket/socket-client";
import { Message } from "@/lib/types/message";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useMessageListener = (conversationId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!conversationId) return;

    const socket = getSocketInstance();

    const handleMessage = (message: Message) => {
      if (message.conversationId !== conversationId) return;

      queryClient.setQueryData<Message[]>(
        ["messages", conversationId],
        (prevMessages) =>
          prevMessages ? [...prevMessages, message] : [message],
      );

      queryClient.invalidateQueries({ queryKey: ["messages-summary"] });
    };

    socket.on(WS_EVENTS.MESSAGE_NEW, handleMessage);

    return () => {
      socket.off(WS_EVENTS.MESSAGE_NEW, handleMessage);
    };
  }, [conversationId, queryClient]);
};
