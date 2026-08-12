import { findByUsername } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";

export const useFindUserByUsername = (query: string) => {
  return useQuery({
    queryKey: ["users", "search", query],
    queryFn: () => findByUsername(query),
    enabled: query.trim().length > 0,
    retry: false,
  });
};
