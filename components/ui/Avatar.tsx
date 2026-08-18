import Image from "next/image";

interface AvatarProps {
  name: string;
  avatarColor: string;
  avatarKey?: string;
  size?: number;
  textSize?: number;
}

export const Avatar = ({
  name,
  avatarColor,
  avatarKey,
  size = 40,
  textSize = 14,
}: AvatarProps) => {
  if (avatarKey) {
    return (
      <div
        className="rounded-full overflow-hidden shrink-0"
        style={{ width: size, height: size, fontSize: textSize }}
      >
        <Image src={avatarKey} alt={name} width={size} height={size} />
      </div>
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold text-white shrink-0"
      style={{
        backgroundColor: avatarColor,
        width: size,
        height: size,
        fontSize: textSize,
      }}
    >
      {name.charAt(0).toLocaleUpperCase()}
    </div>
  );
};
