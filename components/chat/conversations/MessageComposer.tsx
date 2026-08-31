"use client";

import { ContentType } from "@/lib/enums/content-type.enum";
import { useSendMessageMutation } from "@/lib/hooks/chat/useSendMessageMutation";
import { Paperclip, Send } from "lucide-react";
import { useState } from "react";

interface MessageComposerProps {
  conversationId: string;
}

export const MessageComposer = ({ conversationId }: MessageComposerProps) => {
  const [message, setMessage] = useState("");
  const { mutate: sendMessage, isPending } =
    useSendMessageMutation(conversationId);

  const handleSendMessage = () => {
    const content = message.trim();
    if (!content) return;
    sendMessage({
      conversationId,
      content,
      contentType: ContentType.TEXT,
    });
    setMessage("");
  };

  return (
    <footer className="sticky bottom-0 flex h-12 z-50 rounded-full bg-card p-2 mt-6 mb-4 mx-3">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 w-full">
          <button
            onClick={() => {}}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-zinc-600 cursor-pointer"
          >
            <Paperclip className="text-white w-5 h-5" />
          </button>

          <input
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        {message && message.trim() !== "" && (
          <button
            onClick={handleSendMessage}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary hover:bg-primary/80 cursor-pointer"
          >
            <Send className="text-white w-5 h-5" />
          </button>
        )}
      </div>
    </footer>
  );
};
