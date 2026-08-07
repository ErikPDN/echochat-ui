import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/auth-store";

export const useSignupMutation = () => {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setSession(data.user, data.accessToken);
      router.push("/");
    },
  });
};
