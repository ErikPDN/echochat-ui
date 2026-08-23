"use client";

import { Avatar } from "@/components/ui/Avatar";
import { useMeQuery } from "@/lib/hooks/auth/useMeQuery";
import { useMeUpdateAvatar } from "@/lib/hooks/auth/useMeUpdateAvatar";
import { Pencil } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { ModalProfileAvatarOptions } from "./ModalProfileAvatarOptions";
import { useMeDeleteAvatar } from "@/lib/hooks/auth/useMeDeleteAvatar";

export const ProfileAvatarUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user, isLoading: isLoadingUser } = useMeQuery();
  const { mutate: updateAvatar, isPending: isUpdatingAvatar } =
    useMeUpdateAvatar();
  const { mutate: deleteAvatar, isPending: isDeletingAvatar } =
    useMeDeleteAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPending = isUpdatingAvatar || isDeletingAvatar;

  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateAvatar({ file });
    }
    event.target.value = "";
  };

  const handleViewAvatar = () => {
    if (user?.avatarUrl) {
      window.open(user.avatarUrl, "_blank");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteClick = () => {
    deleteAvatar();
  };

  return (
    <div className="flex flex-col justify-center items-center mx-20">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleFileChange}
        className="hidden"
        disabled={isLoadingUser || isPending}
      />

      <div className="relative">
        <button
          type="button"
          onClick={handleAvatarClick}
          disabled={isLoadingUser || isPending}
          className="relative flex cursor-pointer"
        >
          {isLoadingUser || isPending ? (
            <div className="h-19 w-19 flex items-center justify-center bg-primary rounded-full ">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          ) : (
            <>
              <Avatar
                name={user?.name ?? "Unknown"}
                avatarColor="#6366f1"
                avatarUrl={user?.avatarUrl}
                textSize={24}
                size={84}
              />
              <div className="absolute -top-1 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-300 cursor-pointer">
                <Pencil className="h-4 w-4 text-zinc-900" />
              </div>
            </>
          )}
        </button>

        <ModalProfileAvatarOptions
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onView={handleViewAvatar}
          onUploadClick={handleUploadClick}
          onDeleteClick={handleDeleteClick}
          hasAvatar={!!user?.avatarUrl}
          isDeleteAvatarLoading={isDeletingAvatar}
          isUploadAvatarLoading={isUpdatingAvatar}
        />
      </div>
    </div>
  );
};
