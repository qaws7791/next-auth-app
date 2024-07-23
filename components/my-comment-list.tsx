"use client";
import { Button } from "@/components/ui/button";
import { myCommentsOptions } from "@/lib/query-options";
import { formatDate } from "@/lib/utils";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export default function MyCommentList({ userId }: { userId: number }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      myCommentsOptions({
        userId,
        limit: 10,
      })
    );
  const comments = data?.pages.flatMap((page) => page.data);
  useEffect(() => {
    if (btnRef.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      });
      observer.observe(btnRef.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [fetchNextPage]);

  return (
    <div className="flex flex-col divide-y w-full overflow-auto mt-4">
      {comments.map((comment) => (
        <div key={comment.id} className="p-4">
          <p>{comment.content}</p>
          <div className="flex justify-between items-center text-slate-500 text-sm mt-3">
            <span>By {comment.user.email}</span>
            <time>{formatDate(comment.createdAt)}</time>
          </div>
        </div>
      ))}
      <Button
        ref={btnRef}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "불러오는 중"
          : hasNextPage
          ? "더 불러오기"
          : "더 이상 불러올 내용이 없습니다"}
      </Button>
    </div>
  );
}
