import { createPrivateConversation } from "@/lib/api/chat";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePrivateConversationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPrivateConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
