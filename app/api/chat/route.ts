import { aiChatResponse } from "@/lib/ai/setup";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  let messages: Array<{
    role: "user" | "assistant" | "system";
    content: string;
  }>;

  try {
    const body = await request.json();
    messages = body.messages;
  } catch {
    return new Response("Invalid JSON body", {
      status: 400,
    });
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response("messages array is required", {
      status: 400,
    });
  }

  try {
    const result = await aiChatResponse(messages, session.userId);

    return new Response(result, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.error("[/api/chat] Error:", error);

    return new Response(message, {
      status: 500,
    });
  }
}
