import { logout } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogoutMutation = () => {
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearSession();
      router.push("/");
    },
  });
};
