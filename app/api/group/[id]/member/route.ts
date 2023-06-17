import groupService from '@/app/group/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, context: { params: { id: string } }) {
    const groupId = Number.parseInt(context.params.id);
    return NextResponse.json(
        (await groupService().getGroupById(groupId))?.members
    );
}

export async function POST(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const groupId = Number.parseInt(context.params.id);
    const body = await request.json();
    await groupService().addMember(groupId, body.id);
    return new NextResponse();
}
