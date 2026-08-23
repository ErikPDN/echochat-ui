import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Sidebar } from "@/components/layout/Sidebar";
import { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-background text-foreground overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
