import { PageProps } from "@/app/_lib/next-type";
import BalanceService from "@/app/balance/service";
import EditForm from "@/app/balance/[id]/detail/EditForm";
import React from "react";

export default async function Page(props: PageProps) {
  const params = await props.params;
  const balanceId = parseInt(params.id);
  const balance = await BalanceService().getBalanceById(balanceId);
  const detailId = Number.parseInt(params.detailId);
  const detail = await BalanceService().getDetailById(detailId);
  return (
    <div className="space-y-4">
      <p>
        <h1>{balance?.name}</h1>
        <span>編輯記帳內容</span>
      </p>
      {balance && detail ? (
        <EditForm
          balance={balance}
          detail={{
            ...detail,
            shouldPayList: detail.shouldPayList.map(
              (shouldPay) => shouldPay.userId,
            ),
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
