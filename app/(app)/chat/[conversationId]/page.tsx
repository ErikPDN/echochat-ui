import { ChatConversationView } from "@/components/chat/conversations/ConversationView";

interface ChatPageProps {
  params: Promise<{ conversationId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { conversationId } = await params;

  return <ChatConversationView conversationId={conversationId} />;
}
