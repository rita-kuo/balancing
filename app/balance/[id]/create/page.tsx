import React from "react";
import EditForm from "../detail/EditForm";
import { PageProps } from "@/app/_lib/next-type";
import BalanceService from "@/app/balance/service";
import Link from "next/link";

export default async function Page(props: PageProps) {
  const balanceId = parseInt((await props.params).id);
  const balance = await BalanceService().getBalanceById(balanceId);
  return (
    <div className="space-y-4">
      <div>
        <Link href={`/balance/${balanceId}`} className="underline">
          <h1>{balance?.name}</h1>
        </Link>
        <span>新增一筆記帳</span>
      </div>
      {balance ? <EditForm balance={balance} /> : <></>}
    </div>
  );
}
