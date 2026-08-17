import Image from "next/image";

interface AvatarProps {
  name: string;
  avatarColor: string;
  avatarKey?: string;
  size?: number;
}

export const Avatar = ({
  name,
  avatarColor,
  avatarKey,
  size = 40,
}: AvatarProps) => {
  if (avatarKey) {
    return (
      <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
        <Image src={avatarKey} alt={name} width={size} height={size} />
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
