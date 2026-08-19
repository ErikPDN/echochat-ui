"use client";

import { Eye, Trash2, Upload } from "lucide-react";
import { MenuItem } from "./MenuItem";

interface ModalProfileAvatarOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  onView: () => void;
  onUploadClick: () => void;
  onDeleteClick: () => void;
  hasAvatar: boolean;
  isDeleteAvatarLoading: boolean;
  isUploadAvatarLoading: boolean;
}

export const ModalProfileAvatarOptions = ({
  isOpen,
  onClose,
  onView,
  onUploadClick,
  onDeleteClick,
  hasAvatar,
  isDeleteAvatarLoading,
  isUploadAvatarLoading,
}: ModalProfileAvatarOptionsProps) => {
  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="absolute mt-2 top-full left-1/2 -translate-x-1/2 z-50 w-36 rounded-lg bg-card shadow-lg border border-card-border p-1">
        {hasAvatar && (
          <MenuItem
            icon={
              <>
                <Eye className="h-4 w-4" />
              </>
            }
            label="View photo"
            onClick={() => {
              onView();
              onClose();
            }}
          />
        )}
        <MenuItem
          icon={
            <>
              <Upload className="h-4 w-4" />
            </>
          }
          label="Upload photo"
          onClick={() => {
            onUploadClick();
            onClose();
          }}
          disabled={isUploadAvatarLoading}
        />
        {hasAvatar && (
          <MenuItem
            icon={
              <>
                <Trash2 className="h-4 w-4" />
              </>
            }
            label="Delete photo"
            onClick={() => {
              onDeleteClick();
              onClose();
            }}
            disabled={isDeleteAvatarLoading}
          />
        )}
      </div>
    </>
  );
};
