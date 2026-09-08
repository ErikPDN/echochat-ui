import { WS_EVENTS } from "@/lib/constants/ws-events";
import { getSocketInstance } from "@/lib/socket/socket-client";
import { SendMessageRequest } from "@/lib/types/send-message";
import { useCallback } from "react";

export const useSendMessage = () => {
  const sendMessage = useCallback((data: SendMessageRequest) => {
    const socket = getSocketInstance();
    socket.emit(WS_EVENTS.MESSAGE_SEND, data);
  }, []);

  return { sendMessage };
};
