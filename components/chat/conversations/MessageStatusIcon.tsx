import { MessageStatus } from "@/lib/enums/message-status.enum";
import { Check, CheckCheck, Clock, XCircle } from "lucide-react";

interface MessageStatusIconProps {
  status: MessageStatus;
}

export const MessageStatusIcon = ({ status }: MessageStatusIconProps) => {
  switch (status) {
    case MessageStatus.PENDING:
      return <Clock size={12} className="text-gray-400 mt-0.5" />;
    case MessageStatus.SENT:
      return <Check size={14} className="text-gray-400 mt-0.5" />;
    case MessageStatus.DELIVERED:
      return <CheckCheck size={14} className="text-gray-400 mt-0.5" />;
    case MessageStatus.READ:
      return <CheckCheck size={14} className="text-blue-400 mt-0.5" />;
    case MessageStatus.FAILED:
      return <XCircle size={12} className="text-red-500 mt-0.5" />;
    default:
      return null;
  }
};
