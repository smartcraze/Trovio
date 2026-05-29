import { getSession } from "@/lib/auth";

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized. Please log in first.");
  }
  return session;
}
