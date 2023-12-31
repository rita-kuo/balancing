import BalanceService from '@/app/balance/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    context: { params: { id: string } }
) {
    const page = parseInt(request.nextUrl.searchParams.get('page') || '0');
    const perPage = parseInt(
        request.nextUrl.searchParams.get('perPage') || '10'
    );
    return NextResponse.json(
        await BalanceService().getDetailsByBalanceId(
            parseInt(context.params.id),
            page,
            perPage
        )
    );
}

export async function POST(
    request: NextRequest,
    context: { params: { id: string } }
) {
    var data = await request.json();
    await BalanceService().createBalanceDetail({
        ...data,
        balanceId: parseInt(context.params.id),
    });
    return new NextResponse();
}
