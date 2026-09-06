import { markMessagesAsRead } from "@/lib/api/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReadMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markMessagesAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages-summary"],
      });
    },
  });
};
