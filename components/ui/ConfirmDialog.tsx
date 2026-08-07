"use client";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  variant?: "default" | "destructive";
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  isLoading,
  variant,
}: ConfirmDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-around bg-black/60">
      <div className="w-full max-w-sm rounded-2xl bg-card border border-card-border p-5">
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm mt-2 text-gray-400">{description}</p>
        )}

        <div className="flex items-center justify-end gap-2 mt-10">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-white/5 transition-colors duration-150 cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold cursor-pointer disabled:opacity-50 disable:cursor-not-allowed ${
              variant === "destructive"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-primary hover:bg-primary-hover"
            }`}
            disabled={isLoading}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
