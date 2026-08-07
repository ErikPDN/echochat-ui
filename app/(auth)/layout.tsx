import { MessageCircle } from "lucide-react";
import { ReactNode } from "react";
import { GuestRoute } from "@/components/auth/GuestRoute";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <GuestRoute>
      <div className="min-h-screen overflow-y-auto xl:justify-center flex flex-col items-center gap-4 px-4 py-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
            <MessageCircle className="h-6 w-6 text-white" strokeWidth={2.2} />
          </div>
          <h1 className="text-2xl font-semibold">Pulse</h1>
        </div>

        {children}
      </div>
    </GuestRoute>
  );
}
