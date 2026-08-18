import Image from "next/image";

interface AvatarProps {
  name: string;
  avatarColor: string;
  avatarUrl?: string;
  size?: number;
  textSize?: number;
}

export const Avatar = ({
  name,
  avatarColor,
  avatarUrl,
  size = 40,
  textSize = 14,
}: AvatarProps) => {
  if (avatarUrl) {
    return (
      <div
        className="rounded-full overflow-hidden shrink-0"
        style={{ width: size, height: size, fontSize: textSize }}
      >
        <Image
          src={avatarUrl}
          alt={name}
          width={size}
          height={size}
          unoptimized
          loading="eager"
        />
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
