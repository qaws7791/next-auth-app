import CommentForm from "@/components/comment-form";
import CommentList from "@/components/comment-list";
import CommentsSkeleton from "@/components/comments-skeleton";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/user";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const user = await getUser();
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="sr-only">홈페이지</h1>
      {user ? (
        <>
          <p className="text-slate-600 mb-4">
            🎉 환영합니다.&nbsp;
            <Link
              href="/my"
              className="font-bold text-blue-600 hover:underline"
            >
              {user.email}
            </Link>
            님
          </p>
          <CommentForm />
        </>
      ) : (
        <Button asChild>
          <Link href="/login" className="w-full">
            댓글을 남기려면 로그인하세요
          </Link>
        </Button>
      )}
      <Suspense fallback={<CommentsSkeleton />}>
        <CommentList />
      </Suspense>
    </div>
  );
}
