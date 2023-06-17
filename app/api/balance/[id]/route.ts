import BalanceService from '@/app/balance/service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, context: { params: { id: string } }) {
    const data = await BalanceService().getBalanceById(
        parseInt(context.params.id)
    );
    return NextResponse.json(data);
}
