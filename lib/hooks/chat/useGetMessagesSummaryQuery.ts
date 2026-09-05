import { getMessagesSummary } from "@/lib/api/chat";
import { useQuery } from "@tanstack/react-query";

export const useGetMessagesSummaryQuery = (conversationIds: string[]) => {
  return useQuery({
    queryKey: ["messages-summary", conversationIds],
    queryFn: () => getMessagesSummary(conversationIds),
    enabled: conversationIds.length > 0,
    retry: false,
  });
};
