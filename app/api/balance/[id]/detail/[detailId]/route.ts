import BalanceService from "@/app/balance/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { detailId: string } },
) {
  return NextResponse.json(
    await BalanceService().getDetailById(parseInt(context.params.detailId)),
  );
}

export async function PUT(
  request: NextRequest,
  context: { params: { detailId: string } },
) {
  const data = await request.json();
  await BalanceService().updateBalanceDetail(data);
  return new NextResponse();
}
