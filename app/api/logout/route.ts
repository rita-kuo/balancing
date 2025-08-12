import { NextRequest, NextResponse } from "next/server";
import { execute } from "@/app/_util/prisma";

/**
 * Create information for LINE login
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  await execute((client) =>
    client.loginInfo.updateMany({
      where: { idToken: token },
      data: {
        idToken: null,
      },
    }),
  );

  const response = new NextResponse();
  response.cookies.delete("token");
  response.cookies.delete("expires");

  return response;
}
