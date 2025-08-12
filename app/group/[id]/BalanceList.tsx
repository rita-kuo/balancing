import ListItemContainer from "@/app/_component/container/ListItemContainer";
import { currencyIcon } from "@/app/_constant/currency";
import { Balance as Model, OwnerType } from "@prisma/client";
import Link from "next/link";
import React from "react";
import BalanceService from "@/app/balance/service";

const BalanceItem: React.FC<Model> = (props) => {
  const icon = currencyIcon[props.currency];
  return (
    <Link href={`/balance/${props.id}`}>
      <ListItemContainer hoverStyle className="flex items-center gap-2">
        {icon && <div className="text-primary-600">{icon}</div>}
        <div>{props.name}</div>
      </ListItemContainer>
    </Link>
  );
};

const BalanceList = (async (props: { groupId: number }) => {
  const balanceList = await BalanceService().getBalanceList(
    OwnerType.GROUP,
    props.groupId,
  );
  return (
    <div className="grid gap-1">
      {balanceList.map((balance) => (
        <BalanceItem key={`balance-${balance.id}`} {...balance} />
      ))}
    </div>
  );
}) as unknown as React.FC<{ groupId: number }>;

export default BalanceList;
