import BalanceService from '@/app/balance/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, context: { params: { id: string } }) {
    return NextResponse.json(
        await BalanceService().getDetailAmount(parseInt(context.params.id))
    );
}
