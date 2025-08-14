import BalanceService from "@/app/balance/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const data = await BalanceService().getBalanceById(
    parseInt((await context.params).id),
  );
  return NextResponse.json(data);
}

export async function DELETE(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const id = parseInt((await context.params).id);
  await BalanceService().deleteBalance(id);
  return NextResponse.json({ success: true });
}
