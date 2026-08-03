import { create } from "zustand";
import { User } from "@/lib/types/user";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  setSession: (user: User, accessToken: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setSession: (user: User, accessToken: string) => {
        set({ user, accessToken });
      },
      clearSession: () => {
        set({ user: null, accessToken: null });
      },
    }),
    { name: "auth-storage" },
  ),
);
