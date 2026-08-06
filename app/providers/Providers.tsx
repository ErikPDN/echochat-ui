"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthProvider";
import { toast, Toaster } from "sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            classNames: {
              toast: "bg-card! ",
              title: "text-sm! font-medium!",
              error: "border-2! border-red-500/30! [&>div>svg]:text-red-400!",
              success:
                "border-2! border-green-500/30! [&>div>svg]:text-green-400!",
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
};
