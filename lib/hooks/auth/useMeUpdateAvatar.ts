import { updateAvatar } from "@/lib/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMeUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: () => {
      toast.error("Failed to update avatar. Please try again.");
    },
  });
};
