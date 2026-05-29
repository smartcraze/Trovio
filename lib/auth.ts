import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_trivio";

interface JWTPayload {
  userId: string;
  username: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function setSession(userId: string, username: string) {
  const token = signToken({ userId, username });
  const cookieStore = await cookies();
  cookieStore.set("trivio_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getSession(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("trivio_session");
    if (!tokenCookie || !tokenCookie.value) {
      return null;
    }
    return verifyToken(tokenCookie.value);
  } catch (error) {
    return null;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("trivio_session");
}
