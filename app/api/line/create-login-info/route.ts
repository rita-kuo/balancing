import { NextRequest, NextResponse } from "next/server";
import { execute } from "@/app/_util/prisma";

/**
 * Create information for LINE login
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  const loginInfo = await execute((client) =>
    client.loginInfo.create({
      data: {},
    }),
  );

  return NextResponse.json({
    state: loginInfo.state,
    nonce: loginInfo.nonce,
    client_id: process.env.CHANNEL_ID,
  });
}
