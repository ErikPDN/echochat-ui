import {
  disconnectSocket,
  getSocketInstance,
} from "@/lib/socket/socket-client";
import { useAuthStore } from "@/lib/store/auth-store";
import { useEffect } from "react";

export const useSocket = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!accessToken) return;

    getSocketInstance();

    return () => {
      disconnectSocket();
    };
  }, [accessToken]);
};
