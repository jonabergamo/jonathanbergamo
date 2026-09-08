import { Skeleton } from "@/components/ui/skeleton";

export function WindowSkeleton() {
  return (
    <div className="space-y-3 p-6" aria-busy>
      <Skeleton className="h-7 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}
