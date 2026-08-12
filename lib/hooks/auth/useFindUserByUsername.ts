import { findByUsername } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";

export const useFindUserByUsername = (query: string) => {
  const debouncedQuery = useDebouncedValue(query, 300);

  return useQuery({
    queryKey: ["users", "search", debouncedQuery],
    queryFn: () => findByUsername(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
    retry: false,
  });
};
