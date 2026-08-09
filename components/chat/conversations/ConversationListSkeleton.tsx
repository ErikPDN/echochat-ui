"use client";

interface ConversationListSkeletonProps {
  count?: number;
}

export const ConversationListSkeleton = ({
  count = 6,
}: ConversationListSkeletonProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <ul className="flex flex-col gap-2 p-4">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index} className="flex items-center gap-3 px-1 py-2">
            <div className="h-10 w-10 rounded-full bg-card-border skeleton-shimmer shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 w-1/2 rounded bg-card-border skeleton-shimmer" />
              <div className="h-3 w-2/3 rounded bg-card-border skeleton-shimmer" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
