"use client";

import { ReactNode } from "react";

interface AvatarOptionProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const AvatarOption = ({
  icon,
  label,
  onClick,
  disabled,
}: AvatarOptionProps) => {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-2 px-2 py-1 text-sm rounded-md text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground disabled:opacity-50 cursor-pointer"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  );
};
