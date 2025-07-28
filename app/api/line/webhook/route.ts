import { NextRequest, NextResponse } from "next/server";
import LineWebhook from "@/app/_model/line/lineWebhook";
import handleMessage from "@/app/api/line/webhook/handleMessage";

/**
 * Create Group
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  if (!process.env.CHANNEL_SECRET) {
    throw new Error("channelSecret is not set");
  }

  const data = (await request.json()) as LineWebhook;
  data.events.forEach((event) => {
    if (event.type === "message") handleMessage(event);
  });

  return new NextResponse();
}
