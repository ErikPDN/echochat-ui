"use client";

import { SearchBar } from "@/components/ui/SearchBar";
import { useState } from "react";
import { NewChatSelectableUserList } from "./NewChatSelectableUserList";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { AnimatePresence } from "framer-motion";
import { SlidePanel } from "@/components/ui/SlidePanel";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { NewChatGroupForm } from "./NewChatGroupForm";
import { Contact } from "@/lib/hooks/chat/useContacts";
import { useSearch } from "@/lib/hooks/useSearch";

interface NewChatGroupOptionProps {
  onBackClick: () => void;
  onCreateGroupConversation: (groupName: string, members: string[]) => void;
  contacts?: Contact[];
  isCreating: boolean;
  isLoadingContacts?: boolean;
}

export const NewChatGroupOption = ({
  onBackClick,
  onCreateGroupConversation,
  contacts,
  isCreating,
  isLoadingContacts,
}: NewChatGroupOptionProps) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [view, setView] = useState<"select-members" | "group-details">(
    "select-members",
  );
  const [direction, setDirection] = useState<"left" | "right">("right");
  const { filteredItems: filteredContacts, onSearch } = useSearch<Contact>(
    contacts ?? [],
  );

  const handleToggleConversation = (userId: string) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId],
    );
  };

  return (
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      {view === "select-members" ? (
        <SlidePanel key="select-members" direction={direction}>
          <div className="flex flex-col h-full">
            <PanelHeader onBackClick={onBackClick} title="Add Members" />

            <SearchBar placeholder="Search for users..." onSearch={onSearch} />

            <NewChatSelectableUserList
              contacts={filteredContacts}
              isLoadingContacts={isLoadingContacts}
              selectedUserIds={selectedUsers}
              onToggleUser={handleToggleConversation}
            />

            <div className="flex justify-end items-center p-4">
              <ButtonPrimary
                onClick={() => {
                  setDirection("right");
                  setView("group-details");
                }}
                text="Continue"
              />
            </div>
          </div>
        </SlidePanel>
      ) : (
        <SlidePanel key="group-details" direction={direction}>
          <NewChatGroupForm
            onBackClick={() => {
              setDirection("left");
              setView("select-members");
            }}
            onCreateGroupConversation={onCreateGroupConversation}
            isCreating={isCreating}
            memberIds={selectedUsers}
          />
        </SlidePanel>
      )}
    </AnimatePresence>
  );
};
