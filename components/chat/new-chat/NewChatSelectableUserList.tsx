"use client";

import { NewChatSelectableUserListItem } from "./NewChatSelectableUserListItem";
import { NewChatSelectableUserListSkeleton } from "./NewChatSelectableUserListSkeleton";
import { Contact } from "@/lib/hooks/chat/useContacts";

interface NewChatSelectableUserListProps {
  contacts?: Contact[];
  isLoadingContacts?: boolean;
  selectedUserIds?: string[];
  onToggleUser: (userId: string) => void;
}

export const NewChatSelectableUserList = ({
  contacts,
  isLoadingContacts,
  selectedUserIds,
  onToggleUser,
}: NewChatSelectableUserListProps) => {
  if (isLoadingContacts) return <NewChatSelectableUserListSkeleton />;

  return (
    <div className="flex-1 overflow-y-auto">
      <ul className="flex flex-col gap-2 px-4 py-2">
        {contacts?.map((contact) => {
          return (
            <li key={contact.userId}>
              <NewChatSelectableUserListItem
                name={contact.name}
                avatarColor={contact.avatarColor}
                avatarUrl={contact.avatarUrl}
                isSelected={selectedUserIds?.includes(contact.userId)}
                onToggle={() => onToggleUser(contact.userId)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
