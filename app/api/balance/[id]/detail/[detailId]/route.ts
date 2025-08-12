import BalanceService from "@/app/balance/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ detailId: string }> },
) {
  return NextResponse.json(
    await BalanceService().getDetailById(
      parseInt((await context.params).detailId),
    ),
  );
}

export async function PUT(request: NextRequest) {
  const data = await request.json();
  await BalanceService().updateBalanceDetail(data);
  return new NextResponse();
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ detailId: string }> },
) {
  await BalanceService().deleteBalanceDetail(
    parseInt((await context.params).detailId),
  );
  return new NextResponse();
}
