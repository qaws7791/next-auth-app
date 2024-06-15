import {
  insertComment,
  selectComments,
  selectCommentsByUserId,
} from "@/drizzle/queries";
import { PaginationSchema } from "@/lib/schemas";
import { getUser } from "@/lib/user";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const validatedPagination = PaginationSchema.safeParse({
    cursor: Number(searchParams.get("cursor")) || undefined,
    limit: Number(searchParams.get("limit") || 10),
    userId: Number(searchParams.get("userId")) || undefined,
  });

  if (!validatedPagination.success) {
    return new Response("Invalid query parameters", { status: 400 });
  }

  const { cursor, limit, userId } = validatedPagination.data;

  const comments = await (userId
    ? selectCommentsByUserId(userId, { cursor, limit })
    : selectComments({ cursor, limit }));

  return Response.json({
    data: comments,
    nextCursor:
      comments.length === limit ? comments[comments.length - 1].id : null,
  });
}

export async function POST(request: Request): Promise<Response> {
  const user = await getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { comment } = await request.json();

  if (!comment) {
    return new Response("Comment is required", { status: 400 });
  }

  const commentLength = comment.trim().length;

  if (commentLength === 0 || commentLength > 1000) {
    return new Response("Comment should be between 1 and 1000 characters", {
      status: 400,
    });
  }

  try {
    await insertComment(comment, user.id);
    return new Response(null, { status: 201 });
  } catch (error) {
    return new Response("Failed to insert comment", { status: 500 });
  }
}
