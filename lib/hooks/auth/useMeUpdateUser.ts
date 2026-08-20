import { updateUserProfile } from "@/lib/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMeUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("User profile updated successfully.");
    },
    onError: () => {
      toast.error("Failed to update user profile. Please try again.");
    },
  });
};
