import Image from "next/image";

interface AvatarProps {
  name: string;
  avatarColor: string;
  avatarUrl?: string;
}

export const Avatar = ({ name, avatarColor, avatarUrl }: AvatarProps) => {
  if (avatarUrl) {
    return (
      <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
        <Image src={avatarUrl} alt={name} width={40} height={40} />
      </div>
    );
  }

  return (
    <div
      className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
      style={{ backgroundColor: avatarColor }}
    >
      {name.charAt(0).toLocaleUpperCase()}
    </div>
  );
};
