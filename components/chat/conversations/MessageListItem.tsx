import { ContentType } from "@/lib/enums/content-type.enum";

interface MessageListItemProps {
  username: string;
  avatarUrl?: string | null;
  content?: string;
  contentType: ContentType;
  fileIds?: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export const MessageListItem = ({
  username,
  avatarUrl,
  content,
  contentType,
  fileIds,
  createdAt,
  updatedAt,
}: MessageListItemProps) => {
  return (
    <div>
      <div></div>
    </div>
  );
};
