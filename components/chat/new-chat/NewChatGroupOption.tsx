import { SearchBar } from "@/components/ui/SearchBar";
import { Conversation } from "@/lib/types/conversation";
import { useState } from "react";
import { NewChatSelectableUserList } from "./NewChatSelectableUserList";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { AnimatePresence } from "framer-motion";
import { useConversationSearch } from "@/lib/hooks/useConversationSearch";
import { SlidePanel } from "@/components/ui/SlidePanel";
import { PanelHeader } from "@/components/ui/PanelHeader";
import { NewChatGroupForm } from "./NewChatGroupForm";

interface NewChatGroupOptionProps {
  onBackClick: () => void;
  onCreateGroupConversation: (groupName: string, members: string[]) => void;
  conversations?: Conversation[];
  isCreating: boolean;
  isLoadingConversations?: boolean;
}

export const NewChatGroupOption = ({
  onBackClick,
  onCreateGroupConversation,
  conversations,
  isCreating,
  isLoadingConversations,
}: NewChatGroupOptionProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [view, setView] = useState<"select-members" | "group-details">(
    "select-members",
  );
  const [direction, setDirection] = useState<"left" | "right">("right");
  const { filteredConversations, onSearch } = useConversationSearch(
    conversations ?? [],
  );

  return (
    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
      {view === "select-members" ? (
        <SlidePanel key="select-members" direction={direction}>
          <div className="flex flex-col h-full">
            <PanelHeader onBackClick={onBackClick} title="Add Members" />

            <SearchBar placeholder="Search for users..." onSearch={onSearch} />

            <NewChatSelectableUserList
              conversations={filteredConversations}
              isLoadingConversations={isLoadingConversations}
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
          />
        </SlidePanel>
      )}
    </AnimatePresence>
  );
};
