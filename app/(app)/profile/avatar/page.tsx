import { ProfileAvatarUpload } from "@/components/chat/profile/ProfileAvatarUpload";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen items-baseline justify-center text-gray-500 text-sm">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl space-y-4">
        <h2 className="text-md font-semibold text-white mt-8">Profile</h2>
        <ProfileAvatarUpload />
      </div>
    </div>
  );
}
