import userService from '@/app/user/service';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Get Users
 * @returns users
 */
export async function GET(request: NextRequest) {
    const notInGroup = request.nextUrl.searchParams.get('notInGroup');
    const service = userService();
    const data = await service.getUsers({
        notInGroup: notInGroup ? Number.parseInt(notInGroup) : undefined,
    });
    return NextResponse.json(data);
}

/**
 * Create User
 * @param request
 * @returns
 */
export async function POST(request: NextRequest) {
    const data = await request.json();
    const service = userService();
    await service.createUser(data);
    return new NextResponse();
}
