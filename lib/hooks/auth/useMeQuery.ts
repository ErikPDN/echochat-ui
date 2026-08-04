import { getMe } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export const useMeQuery = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    enabled: !!accessToken,
    retry: false,
  });
};
