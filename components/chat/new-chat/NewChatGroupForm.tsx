"use client";

import { PanelHeader } from "@/components/ui/PanelHeader";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ConversationGroupFormSchema,
  conversationGroupFormSchema,
} from "@/lib/schemas/conversation";
import { Camera, Users } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";

interface NewChatGroupFormProps {
  onBackClick: () => void;
  onCreateGroupConversation: (
    groupName: string,
    memberIds: string[],
    file?: File,
  ) => void;
  isCreating?: boolean;
  memberIds?: string[];
}

export const NewChatGroupForm = ({
  onBackClick,
  onCreateGroupConversation,
  isCreating,
  memberIds,
}: NewChatGroupFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ConversationGroupFormSchema>({
    resolver: zodResolver(conversationGroupFormSchema),
  });

  const onSubmit = ({ groupName }: ConversationGroupFormSchema) => {
    onCreateGroupConversation(groupName, memberIds ?? [], file ?? undefined);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file, { shouldValidate: true });
      setFile(file);
    }
    e.target.value = "";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-full space-y-4"
    >
      <PanelHeader onBackClick={onBackClick} title="New Group Chat" />

      <button
        type="button"
        onClick={handleUploadClick}
        className="relative flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-primary cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />
        {file ? (
          <Image
            src={URL.createObjectURL(file)}
            alt="Uploaded"
            className="h-full w-full rounded-full object-cover"
            unoptimized
            loading="eager"
            width={96}
            height={96}
          />
        ) : (
          <div className="flex items-center justify-center">
            <Users className="h-10 w-10 text-white" />
          </div>
        )}
        <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-300 cursor-pointer">
          <Camera className="h-4 w-4 text-zinc-900" />
        </div>
      </button>

      <div className="flex flex-col px-4 mt-4">
        <input
          id="group-name"
          {...register("groupName")}
          placeholder="Enter group name"
          className="w-full text-sm justify-center border border-card-border rounded-lg p-2 bg-input-background focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.groupName && (
          <span className="text-red-500 text-xs mt-1 ml-1">
            {errors.groupName.message}
          </span>
        )}
      </div>

      <div className="flex items-center justify-end p-4 mt-auto">
        <ButtonPrimary
          type="submit"
          text="Create"
          isLoading={isCreating}
          disabledCondition={isCreating || !memberIds}
        />
      </div>
    </form>
  );
};
