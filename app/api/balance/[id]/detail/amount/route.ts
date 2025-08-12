import BalanceService from "@/app/balance/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  return NextResponse.json(
    await BalanceService().getDetailAmount(parseInt((await context.params).id)),
  );
}
