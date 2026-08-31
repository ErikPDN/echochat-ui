import { sendMessage } from "@/lib/api/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendMessageMutation = (conversationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] }),
  });
};
