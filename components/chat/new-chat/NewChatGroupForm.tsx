import { Conversation } from "@/lib/types/conversation";

interface NewChatGroupFormProps {
  onBackClick: () => void;
  onCreateGroupConversation: (groupName: string, members: string[]) => void;
  conversations?: Conversation[];
}

export const NewChatGroupForm = ({
  onBackClick,
  onCreateGroupConversation,
  conversations,
}: NewChatGroupFormProps) => {
  return <></>;
};
