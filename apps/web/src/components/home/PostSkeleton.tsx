export function PostSkeleton() {
  return (
    <div className="bg-white dark:bg-bs-dark1 rounded-[6px] mb-[24px] border border-bs-border dark:border-bs-dark2 overflow-hidden animate-pulse bs-card-shadow">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between px-[24px] pt-[24px] pb-[16px]">
        <div className="flex items-center gap-[12px]">
          <div className="w-[42px] h-[42px] rounded-full bg-slate-200 dark:bg-bs-dark2"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-slate-200 dark:bg-bs-dark2 rounded"></div>
            <div className="h-3 w-20 bg-slate-200 dark:bg-bs-dark2 rounded"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-[24px] pb-[16px] space-y-2">
        <div className="h-4 w-full bg-slate-200 dark:bg-bs-dark2 rounded"></div>
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-bs-dark2 rounded"></div>
      </div>

      {/* Image Skeleton */}
      <div className="w-full h-[300px] bg-slate-100 dark:bg-bs-dark1 px-[24px] mb-[16px]">
        <div className="w-full h-full rounded-lg bg-slate-200 dark:bg-bs-dark2"></div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex items-center justify-between px-[24px] py-[16px] border-t border-bs-bg dark:border-bs-dark2">
        <div className="h-4 w-20 bg-slate-200 dark:bg-bs-dark2 rounded"></div>
        <div className="flex gap-4">
          <div className="h-4 w-16 bg-slate-200 dark:bg-bs-dark2 rounded"></div>
          <div className="h-4 w-16 bg-slate-200 dark:bg-bs-dark2 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="w-full">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
}