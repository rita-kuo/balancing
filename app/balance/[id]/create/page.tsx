import React from "react";
import EditForm from "../detail/EditForm";
import { PageProps } from "@/app/_lib/next-type";
import BalanceService from "@/app/balance/service";

export default async function Page(props: PageProps) {
  const balanceId = parseInt(props.params.id);
  const balance = await BalanceService().getBalanceById(balanceId);
  return (
    <div className="space-y-4">
      <p>
        <h1>{balance?.name}</h1>
        <span>新增一筆記帳</span>
      </p>
      {balance ? <EditForm balance={balance} /> : <></>}
    </div>
  );
}
