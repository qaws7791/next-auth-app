"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CommentForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment || !comment.trim().length) return;
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL! + "/api/comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      }
    );

    if (response.status === 401) {
      const confirm = window.confirm(
        "로그인이 필요합니다. 로그인하시겠습니까?"
      );
      if (confirm) {
        router.push("/login");
      }
      return;
    }

    if (response.ok) {
      setComment("");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["my-comments"] });
    }
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="comment" className="sr-only">
          Comment
        </label>
        <Textarea
          id="comment"
          name="comment"
          placeholder="댓글을 입력하세요"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">등록</Button>
      </div>
    </form>
  );
}
