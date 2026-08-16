interface ChatPageProps {
  params: Promise<{ conversationId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { conversationId } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center text-gray-500 text-sm">
      <h2 className="text-lg font-bold text-gray-500">
        Conversation: {conversationId}
      </h2>
    </div>
  );
}
