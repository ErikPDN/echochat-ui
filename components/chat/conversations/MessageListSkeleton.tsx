interface MessageListSkeletonProps {
  count?: number;
}

export const MessageListSkeleton = ({
  count = 5,
}: MessageListSkeletonProps) => {
  return (
    <div className="flex-1 overflow-auto p-4 scrollbar-thin">
      <ul className="flex flex-col gap-1.5">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index}>
            <div className="flex flex-col items-start">
              <div className="h-10 w-40 px-3 py-2 rounded-xl bg-zinc-800 rounded-bl-none skeleton-shimmer" />
            </div>
            <div className="flex flex-col items-end">
              <div className="h-10 w-40 px-3 py-2 rounded-xl bg-zinc-800 rounded-br-none skeleton-shimmer" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
