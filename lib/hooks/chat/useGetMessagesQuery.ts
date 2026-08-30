import { getMessages } from "@/lib/api/chat";
import { useQuery } from "@tanstack/react-query";

export const useGetMessagesQuery = (conversationId: string) => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages(conversationId),
    retry: false,
  });
};
