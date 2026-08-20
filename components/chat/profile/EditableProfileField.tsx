import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Pencil } from "lucide-react";
import { ReactNode, useState } from "react";
import { FieldValues, Path, useForm } from "react-hook-form";
import { ZodType } from "zod/v4";

interface EditableProfileFieldProps<T extends FieldValues> {
  icon: ReactNode;
  value: string;
  fieldName: Path<T>;
  schema: ZodType<T>;
  onSave: (value: string) => void;
  isSaving: boolean;
}

export const EditableProfileField = <T extends FieldValues>({
  icon,
  value,
  fieldName,
  schema,
  onSave,
  isSaving,
}: EditableProfileFieldProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    setFocus,
    reset,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: { [fieldName]: value } as any,
  });

  const startEditing = () => {
    setIsEditing(true);
    setTimeout(() => setFocus(fieldName), 0);
  };

  const onSubmit = (data: T) => {
    const newValue = data[fieldName] as string;
    if (newValue !== value) onSave(newValue);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    reset({ [fieldName]: value } as any);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative flex w-full">
      <div className="absolute left-6 top-1/2 -translate-y-1/2">{icon}</div>
      <input
        {...register(fieldName)}
        readOnly={!isEditing}
        onKeyDown={(e) => e.key === "Escape" && cancelEditing()}
        className="w-full border-b-2 border-transparent border-b-card-border mx-6 px-3 py-2 pl-8 focus:outline-none focus:border-b-primary transition-colors duration-150"
      />
      {isEditing ? (
        <button type="submit" disabled={isSaving} className="cursor-pointer">
          <Check className="h-4 w-4" />
        </button>
      ) : (
        <button type="button" onClick={startEditing} className="cursor-pointer">
          <Pencil className="h-4 w-4" />
        </button>
      )}
      {errors[fieldName] && (
        <span className="text-red-500 text-xs">
          {errors[fieldName]?.message as string}
        </span>
      )}
    </form>
  );
};
