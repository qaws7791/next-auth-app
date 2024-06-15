import CommentsSkeleton from "@/components/comments-skeleton";
import MyCommentList from "@/components/my-comment-list";
import SignOutButton from "@/components/signout-button";

import { getUser } from "@/lib/user";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "마이페이지",
  description: "마이페이지",
};

export default async function MyPage() {
  const user = await getUser();
  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">내 정보</h1>
        <SignOutButton />
      </div>
      <p>이메일: {user.email}</p>
      <p>id: {user.id}</p>
      <Suspense fallback={<CommentsSkeleton />}>
        <MyCommentList userId={user.id} />
      </Suspense>
    </div>
  );
}
