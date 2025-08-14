"use client";
import React, { useState } from "react";
import { BalanceItem } from "@/app/group/[id]/BalanceItem";
import { Balance } from "@/app/_model/balance";

const BalanceList: React.FC<{ balanceList: Balance[] }> = (props: {
  balanceList: Balance[];
}) => {
  const [balanceList, setBalanceList] = useState<Balance[]>(props.balanceList);
  return (
    <div className="grid gap-1">
      {balanceList.map((balance, index) => (
        <BalanceItem
          key={`balance-${balance.id}`}
          {...balance}
          onDelete={() =>
            setBalanceList((balanceList) => {
              const updated = [...balanceList];
              updated.splice(index, 1);
              return updated;
            })
          }
        />
      ))}
    </div>
  );
};

export default BalanceList;
