import { create } from "zustand";
import { User } from "@/lib/types/user";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isHydrating: boolean;
  setSession: (user: User, accessToken: string) => void;
  setAccessToken: (accessToken: string) => void;
  setIsHydrating: (isHydrating: boolean) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isHydrating: true,
      setIsHydrating: (isHydrating) => {
        set({ isHydrating });
      },
      setSession: (user, accessToken) => {
        set({ user, accessToken });
      },
      setAccessToken: (accessToken) => {
        set({ accessToken });
      },
      clearSession: () => {
        set({ user: null, accessToken: null });
      },
    }),
    { name: "auth-storage", partialize: (state) => ({ user: state.user }) }, // Persist only the user object, not the access token
  ),
);
