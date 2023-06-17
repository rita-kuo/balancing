import BalanceService from '@/app/balance/service';
import { OwnerType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const groupIdStr = request.nextUrl.searchParams.get('groupId');
    const groupId = groupIdStr ? parseInt(groupIdStr) : undefined;

    const userIdStr = request.nextUrl.searchParams.get('userId');
    const userId = userIdStr ? parseInt(userIdStr) : undefined;

    return NextResponse.json(
        await BalanceService().getBalanceList(
            groupId ? OwnerType.GROUP : OwnerType.PERSONAL,
            groupId || userId || 0
        )
    );
}

export async function POST(request: NextRequest) {
    var data = await request.json();
    await BalanceService().createBalance(data);
    return new NextResponse();
}
