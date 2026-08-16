import { useAuthStore } from "@/lib/store/auth-store";
import { useGetConversationsQuery } from "./useGetConversationsQuery";
import { ConversationType } from "@/lib/types/conversation.response";
import { stringToColor } from "@/lib/utils/string-to-color";

export interface Contact {
  userId: string;
  username: string;
  name: string;
  avatarColor: string;
  avatarUrl?: string;
}

export const useContacts = () => {
  const currentUser = useAuthStore((state) => state.user);
  const { data: conversations = [], isLoading } = useGetConversationsQuery();

  const contacts: Contact[] = conversations
    .filter((c) => c.type === ConversationType.PRIVATE)
    .map((c) => {
      const otherMember = c.members.find(
        (member) => member.userId !== currentUser?.id,
      );

      return otherMember
        ? {
            userId: otherMember.userId,
            username: otherMember.username,
            name: otherMember.name,
            avatarColor: stringToColor(otherMember.userId),
            avatarUrl: otherMember.avatarUrl,
          }
        : null;
    })
    .filter(
      (contact): contact is NonNullable<typeof contact> => contact !== null,
    );

  return { contacts, isLoading };
};
