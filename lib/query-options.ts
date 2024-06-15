import {
  fetchComments,
  FetchCommentsParams,
  fetchMyComments,
  FetchMyCommentsParams,
} from "@/lib/api";
import { infiniteQueryOptions } from "@tanstack/react-query";

export function commentsOptions({ limit, cursor }: FetchCommentsParams) {
  return infiniteQueryOptions({
    queryKey: ["comments", { limit, cursor }],
    queryFn: async ({ pageParam }) =>
      fetchComments({ cursor: pageParam, limit }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
    initialPageParam: cursor,
  });
}

export function myCommentsOptions({
  userId,
  cursor,
  limit,
}: FetchMyCommentsParams) {
  return infiniteQueryOptions({
    queryKey: ["my-comments", { userId, limit, cursor }],
    queryFn: async ({ pageParam }) =>
      fetchMyComments({ userId, cursor: pageParam, limit }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
    initialPageParam: cursor,
  });
}
