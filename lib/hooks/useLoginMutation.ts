import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/auth";

export const useLoginMutation = () => {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data.user, data.token);
      router.push("/home");
    },
  });
};
