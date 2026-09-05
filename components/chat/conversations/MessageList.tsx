"use client";

import { Message } from "@/lib/types/message";
import { MessageListSkeleton } from "./MessageListSkeleton";
import { MessageListItem } from "./MessageListItem";
import { ConversationType } from "@/lib/enums/conversation-type";
import { stringToColor } from "@/lib/utils/string-to-color";

interface MessageListProps {
  isMessageListLoading?: boolean;
  messages?: Message[];
  conversationType?: ConversationType;
}

// TODO: melhorar barra de scroll e criar skeleton para mensagens
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
          {messages?.map((message, index) => {
            const userNameColor = stringToColor(message.senderId);

            return (
              <li key={message.messageId}>
                <MessageListItem
                  conversationType={conversationType}
                  messageIndex={index}
                  messageId={message.messageId}
                  senderId={message.senderId}
                  senderColor={userNameColor}
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
            );
          })}
        </ul>
      )}
    </div>
  );
};
