import { refreshAccessToken } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { ReactNode, useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isHydrating, setIsHydrating] = useState(true);
  const setSession = useAuthStore((state) => state.setSession);
  const clearSession = useAuthStore((state) => state.clearSession);

  useEffect(() => {
    refreshAccessToken()
      .then(({ user, accessToken }) => setSession(user, accessToken))
      .catch(() => clearSession())
      .finally(() => setIsHydrating(false));
  }, [setSession, clearSession]);

  if (isHydrating) return null;

  return <>{children}</>;
};
