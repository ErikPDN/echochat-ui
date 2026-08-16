import { getConversations } from "@/lib/api/chat";
import { useQuery } from "@tanstack/react-query";

export const useGetConversationsQuery = () => {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    retry: false,
  });
};
