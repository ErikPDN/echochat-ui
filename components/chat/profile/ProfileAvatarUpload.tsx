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
        disabled={isLoadingUser || isPending}
      />

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
              size={76}
            />
            <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-300 cursor-pointer">
              <Camera className="h-4 w-4 text-zinc-900" />
            </div>
          </>
        )}
      </button>
    </div>
  );
};
