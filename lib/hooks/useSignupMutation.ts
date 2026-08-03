import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signup } from "../api/auth";
import { useAuthStore } from "../store/auth-store";

export const useSignupMutation = () => {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      setSession(data.user, data.token);
      router.push("/login");
    },
  });
};
