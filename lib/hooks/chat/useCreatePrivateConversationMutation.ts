import { createPrivateConversation } from "@/lib/api/chat";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreatePrivateConversationMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPrivateConversation,
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      router.push(`$/chat/${id}`);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
