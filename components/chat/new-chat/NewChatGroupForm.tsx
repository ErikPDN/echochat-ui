import { PanelHeader } from "@/components/ui/PanelHeader";

interface NewChatGroupFormProps {
  onBackClick: () => void;
  onCreateGroupConversation: (groupName: string, members: string[]) => void;
  isCreating?: boolean;
}

export const NewChatGroupForm = ({
  onBackClick,
  onCreateGroupConversation,
  isCreating,
}: NewChatGroupFormProps) => {
  return (
    <div className="flex flex-col h-full">
      <PanelHeader onBackClick={onBackClick} title="New Group Chat" />
    </div>
  );
};
