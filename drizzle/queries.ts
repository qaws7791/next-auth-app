import "server-only";
import { db } from "@/drizzle/db";
import {
  commentsTable,
  InsertComment,
  InsertUser,
  SelectUser,
  usersTable,
} from "@/drizzle/schemas";
import { and, desc, eq, gt, lt } from "drizzle-orm";

export async function insertUser(data: InsertUser) {
  const result = await db.insert(usersTable).values(data).returning();
  return result[0];
}

export async function selectUserById(
  id: SelectUser["id"]
): Promise<SelectUser | undefined> {
  const data = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);

  return data[0];
}

export async function selectUserByEmail(
  email: SelectUser["email"]
): Promise<SelectUser | undefined> {
  const data = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  return data[0];
}

export async function existingUser(email: string): Promise<boolean> {
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  return !!user;
}

export async function insertComment(
  data: InsertComment["content"],
  userId: number
) {
  const result = await db
    .insert(commentsTable)
    .values({
      content: data,
      userId: userId,
    })
    .returning();
  return result[0];
}

export async function selectComments({
  cursor,
  limit = 10,
}: {
  cursor?: number;
  limit?: number;
} = {}) {
  const data = await db.query.commentsTable.findMany({
    limit,
    where: cursor ? lt(commentsTable.id, cursor) : undefined,
    orderBy: (comments, { desc }) => [desc(comments.id)],
    with: {
      user: {
        columns: {
          email: true,
        },
      },
    },
  });

  return data;
}

export async function selectCommentsByUserId(
  userId: number,
  { cursor, limit = 10 }: { cursor?: number; limit?: number } = {}
) {
  const data = await db.query.commentsTable.findMany({
    where: cursor
      ? and(eq(commentsTable.userId, userId), lt(commentsTable.id, cursor))
      : eq(commentsTable.userId, userId),
    limit,
    orderBy: (comments, { desc }) => [desc(comments.id)],
    with: {
      user: {
        columns: {
          email: true,
        },
      },
    },
  });

  return data;
}
