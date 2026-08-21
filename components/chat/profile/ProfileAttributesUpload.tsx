"use client";

import { useMeQuery } from "@/lib/hooks/auth/useMeQuery";
import { EditableProfileField } from "./EditableProfileField";
import { nameSchema, usernameSchema } from "@/lib/schemas/profile";
import { AtSign, User } from "lucide-react";
import { useMeUpdateUser } from "@/lib/hooks/auth/useMeUpdateUser";

export const ProfileAttributesUpload = () => {
  const { data: user, isLoading: isLoadingUser } = useMeQuery();
  const { mutate: updateUser, isPending: isUpdatingUser } = useMeUpdateUser();

  if (isLoadingUser) return null;

  return (
    <div className="flex flex-col justify-center items-center max-w-2xl w-full my-8 space-y-8">
      <EditableProfileField
        icon={<User className="h-4 w-4 text-gray-500" />}
        value={user?.name ?? ""}
        fieldName="name"
        schema={nameSchema}
        onSave={(value) => updateUser({ name: value })}
        isSaving={isUpdatingUser}
      />
      <EditableProfileField
        icon={<AtSign className="h-4 w-4 text-gray-500" />}
        value={user?.username ?? ""}
        fieldName="username"
        schema={usernameSchema}
        onSave={(value) => updateUser({ username: value })}
        isSaving={isUpdatingUser}
      />
    </div>
  );
};
