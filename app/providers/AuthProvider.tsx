import { refreshAccessToken } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { ReactNode, useEffect } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);
  const setIsHydrating = useAuthStore((state) => state.setIsHydrating);

  useEffect(() => {
    refreshAccessToken()
      .then(({ user, accessToken }) => setSession(user, accessToken))
      .catch(() => clearSession())
      .finally(() => setIsHydrating(false));
  }, [setSession, clearSession, setIsHydrating]);

  return <>{children}</>;
};
