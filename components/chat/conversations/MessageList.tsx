import { Message } from "@/lib/types/message";
import { MessageListSkeleton } from "./MessageListSkeleton";
import { MessageListItem } from "./MessageListItem";
import { ConversationType } from "@/lib/enums/conversation-type";

interface MessageListProps {
  isMessageListLoading?: boolean;
  messages?: Message[];
  conversationType?: ConversationType;
}

export const MessageList = ({
  conversationType,
  isMessageListLoading,
  messages,
}: MessageListProps) => {
  return (
    <div className="flex-1 overflow-auto p-4">
      {isMessageListLoading ? (
        <MessageListSkeleton />
      ) : messages && messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-sm text-gray-500">
            No messages yet. Start a conversation!
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-1.5 scrollbar-thin">
          {messages?.map((message, index) => (
            <li key={message.messageId}>
              <MessageListItem
                conversationType={conversationType}
                messageIndex={index}
                messageId={message.messageId}
                senderId={message.senderId}
                username={message.senderUsername}
                avatarUrl={message.senderAvatarUrl}
                content={message.content}
                contentType={message.contentType}
                fileIds={message.fileIds}
                createdAt={message.createdAt}
                previousCreatedAt={
                  index > 0 ? messages[index - 1].createdAt : undefined
                }
                updatedAt={message.updatedAt}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
