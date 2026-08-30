"use client";

export const ConversationHeaderSkeleton = () => {
  return (
    <header className="sticky h-16 top-0 z-50 w-full border-b border-card-border bg-card">
      <div className="flex h-full items-center justify-between gap-3 px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-300 skeleton-shimmer"></div>
          <div className="flex flex-col">
            <div className="h-4 w-24 bg-gray-300 skeleton-shimmer rounded-md"></div>
            <div className="h-3 w-48 bg-gray-300 mt-1 skeleton-shimmer rounded-sm"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
