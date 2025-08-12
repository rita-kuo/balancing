import { NextRequest, NextResponse } from "next/server";
import userService from "@/app/user/service";
import { getMyId } from "@/app/api/me/me.service";

/**
 * Get User Briefing
 * @returns user briefings
 */
export async function GET(request: NextRequest) {
  const userId = await getMyId(request);
  if (!userId) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(await userService().getPersonalBriefing(userId));
}
