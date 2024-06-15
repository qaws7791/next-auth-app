import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CommentsSkeleton() {
  return (
    <div className="flex flex-col divide-y w-full overflow-auto">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="p-4">
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
        </div>
      ))}
    </div>
  );
}
