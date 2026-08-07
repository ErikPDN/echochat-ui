import { logout } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogoutMutation = () => {
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearSession();
      router.push("/");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Logout failed. Please try again.",
      );
    },
  });
};
