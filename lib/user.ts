import "server-only";
import { selectUserById } from "@/drizzle/queries";
import { verifySession } from "@/lib/session";
import { cache } from "react";

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await selectUserById(session.userId);

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      email: data.email,
    };
  } catch (error) {
    return null;
  }
});
