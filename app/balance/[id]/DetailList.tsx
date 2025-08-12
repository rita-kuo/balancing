import React from "react";
import { DetailItem } from "@/app/balance/[id]/DetailItem";
import BalanceService from "@/app/balance/service";

const DetailList = (async (props: { balanceId: number; page: number }) => {
  const perPage = parseInt(process.env.NEXT_PUBLIC_PERPAGE || "10");
  const details = await BalanceService().getDetailsByBalanceId(
    props.balanceId,
    props.page,
    perPage,
  );

  return (
    <>
      {details.map((detail) => (
        <DetailItem key={`detail-${detail.id}`} {...detail} />
      ))}
    </>
  );
}) as unknown as React.FC<{ balanceId: number; page: number }>;

export default DetailList;
