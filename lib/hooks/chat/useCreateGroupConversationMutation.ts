import { createGroupConversation } from "@/lib/api/chat";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateGroupConversationMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createGroupConversation,
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      router.push(`$/chat/${id}`);
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
