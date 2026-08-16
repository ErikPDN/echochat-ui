import { addMemberToConversation } from "@/lib/api/chat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils/get-error-message";

export const useAddMemberToConversationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMemberToConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
