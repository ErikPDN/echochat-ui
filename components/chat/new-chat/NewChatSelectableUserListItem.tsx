import { Avatar } from "@/components/ui/Avatar";
import { Check } from "lucide-react";

interface NewChatSelectableUserListItemProps {
  name: string;
  avatarColor: string;
  avatarUrl?: string;
  isSelected: boolean;
  onToggle: () => void;
}

export const NewChatSelectableUserListItem = ({
  name,
  avatarColor,
  avatarUrl,
  isSelected,
  onToggle,
}: NewChatSelectableUserListItemProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative w-full flex items-center rounded-lg gap-3 px-4 py-3 text-left cursor-pointer ${isSelected ? "border-none ring-2 ring-primary transition-colors duration-200" : "hover:bg-white/5"}`}
    >
      <Avatar name={name} avatarColor={avatarColor} avatarUrl={avatarUrl} />
      <span className="flex-1 min-w-0 text-sm font-medium text-white">
        {name}
      </span>
      {isSelected && (
        <div className="absolute right-2 top-2 flex items-center justify-center h-4 w-4 rounded-full bg-primary">
          <Check className="h-3 w-3 " />
        </div>
      )}
    </button>
  );
};
