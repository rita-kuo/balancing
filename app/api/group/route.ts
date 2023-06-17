import groupService from '@/app/group/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json(await groupService().getGroups());
}

/**
 * Create Group
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
    const data = await request.json();
    const service = groupService();
    await service.createGroup(data);
    return new NextResponse();
}
