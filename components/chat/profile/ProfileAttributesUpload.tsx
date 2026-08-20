import { User } from "lucide-react";

export const ProfileAttributesUpload = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-2xl w-full my-4">
      <div className="relative flex w-full">
        <div className="absolute left-6 top-1/2 -translate-y-1/2">
          <User className="text-gray-500 h-4 w-4" />
        </div>

        <input
          type="text"
          className="w-full border border-card-border rounded-xl px-3 py-2 pl-8 bg-input-background focus:outline-none mx-4"
        />
      </div>
    </div>
  );
};
