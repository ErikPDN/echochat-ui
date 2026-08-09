interface NewChatPrivateConversationListSkeletonProps {
  count?: number;
}

export const NewChatPrivateConversationListSkeleton = ({
  count = 6,
}: NewChatPrivateConversationListSkeletonProps) => {
  return (
    <div className="flex-1 overflow-y-auto mt-1/2">
      <ul className="flex flex-col gap-2 p-4">
        <span className="text-sm font-medium text-zinc-400 ml-2">
          Private Conversations
        </span>
        {Array.from({ length: count }).map((_, index) => (
          <li key={index} className="flex items-center gap-3 px-1 py-2">
            <div className="h-10 w-10 rounded-full bg-card-border skeleton-shimmer shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 w-1/2 rounded bg-card-border skeleton-shimmer" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
