"use client";

import { useAuthStore } from "@/lib/store/auth-store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isHydrating = useAuthStore((state) => state.isHydrating);

  useEffect(() => {
    if (!isHydrating && !user) {
      router.replace("/login");
    }
  }, [isHydrating, user, router]);

  if (isHydrating)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-muted border-t-primary" />
      </div>
    );

  return <>{children}</>;
};
