import { createGroupConversation } from "@/lib/api/chat";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateGroupConversationMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroupConversation,
    onSuccess: (conversation) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.setQueryData(
        ["conversations", conversation.id],
        conversation,
      );
      router.push(`/chat/${conversation.id}`);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
