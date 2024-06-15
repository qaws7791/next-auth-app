import { Comments } from "@/lib/types";

export type CommentApiResult = {
  data: Comments;
  nextCursor: number | null | undefined;
};

export type FetchCommentsParams = {
  cursor?: number | undefined;
  limit: number;
};

export const fetchComments = async ({ cursor, limit }: FetchCommentsParams) => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + "/api/comments");
  url.searchParams.set("cursor", cursor?.toString() || "");
  url.searchParams.set("limit", limit.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("An error occurred while fetching comments");
  }

  return response.json() as Promise<CommentApiResult>;
};

export type FetchMyCommentsParams = {
  userId: number;
  cursor?: number | undefined;
  limit: number;
};

export const fetchMyComments = async ({
  userId,
  cursor,
  limit,
}: FetchMyCommentsParams) => {
  const url = new URL(process.env.NEXT_PUBLIC_API_URL + "/api/comments");
  url.searchParams.set("userId", userId.toString());
  url.searchParams.set("cursor", cursor?.toString() || "");
  url.searchParams.set("limit", limit.toString());
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("An error occurred while fetching comments");
  }

  return response.json() as Promise<CommentApiResult>;
};
