import groupService from "@/app/group/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const groupId = Number.parseInt((await context.params).id);
  return NextResponse.json(
    (await groupService().getGroupById(groupId))?.members,
  );
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const groupId = Number.parseInt((await context.params).id);
  const body = await request.json();
  await groupService().addMember(groupId, body.id);
  return new NextResponse();
}
