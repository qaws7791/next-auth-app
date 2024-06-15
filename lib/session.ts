import "server-only";
import { SessionPayload } from "@/lib/types";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SECRET_KEY!;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function decrypt(session: string | undefined) {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

const EXPIRES = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + EXPIRES);

  const session = await encrypt({
    userId,
    expiresAt,
  });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function verifySession() {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session) {
    return null;
  }

  return {
    userId: Number(session.userId),
  };
}

export async function updateSession() {
  const cookie = cookies().get("session")?.value;
  const payload = await decrypt(cookie);

  if (!cookie || !payload) {
    return null;
  }

  const expiresAt = new Date(Date.now() + EXPIRES);
  cookies().set("session", cookie, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete("session");
}
