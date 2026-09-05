import { getMessages } from "@/lib/api/chat";
import { useQuery } from "@tanstack/react-query";

export const useGetMessagesQuery = (
  conversationId: string,
  limit?: number,
  before?: string,
) => {
  return useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId, limit, before),
    retry: false,
  });
};
