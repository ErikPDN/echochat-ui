"use client";

import { Avatar } from "@/components/ui/Avatar";
import { useMeQuery } from "@/lib/hooks/auth/useMeQuery";
import { useMeUpdateAvatar } from "@/lib/hooks/auth/useMeUpdateAvatar";
import { Camera } from "lucide-react";
import { ChangeEvent, useRef } from "react";

export const ProfileAvatarUpload = () => {
  const { data: user, isLoading: isLoadingUser, error } = useMeQuery();
  const { mutate: updateAvatar, isPending } = useMeUpdateAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateAvatar({ file });
    }
    event.target.value = "";
  };

  return (
    <div className="flex flex-col justify-center items-center mx-20">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleAvatarClick}
        className="relative flex cursor-pointer"
      >
        <Avatar
          name={user?.name ?? "Unknown"}
          avatarColor="#6366f1"
          avatarKey={user?.avatarKey}
          textSize={24}
          size={78}
        />
        <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-300 cursor-pointer">
          <Camera className="h-4 w-4 text-zinc-900" />
        </div>
      </button>
    </div>
  );
};
