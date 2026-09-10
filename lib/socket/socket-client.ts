import { io, Socket } from "socket.io-client";
import { useAuthStore } from "../store/auth-store";

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3005";

let socketInstance: Socket | null = null;

export const getSocketInstance = (): Socket => {
  if (!socketInstance) {
    socketInstance = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: (cb) => cb({ token: useAuthStore.getState().accessToken }),
    });
  }

  return socketInstance;
};

export const disconnectSocket = (): void => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};
