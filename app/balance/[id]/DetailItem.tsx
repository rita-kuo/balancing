"use client";
import React from "react";
import { Detail } from "@/app/_model/balance";
import { useModal } from "@/app/_hook/useModal";
import ListItemContainer from "@/app/_component/container/ListItemContainer";
import { DetailType } from "@prisma/client";
import IconButton from "@/app/_component/button/IconButton";
import { FaPencilAlt, FaTrashAlt } from "react-icons/all";
import { DeleteModal } from "@/app/balance/[id]/DeleteModal";
import Link from "next/link";
import { formatInTimeZone } from "date-fns-tz";
import { currencyIcon } from "@/app/_constant/currency";

export const DetailItem: React.FC<Detail> = (props) => {
  const { open } = useModal();
  return (
    <ListItemContainer className="[&>*]:w-full space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            {props.type === DetailType.EXPENSE ? (
              <div className="font-bold text-red-400">支出</div>
            ) : (
              <div className="font-bold text-lime-600">收入</div>
            )}
            <div className="text-xs">by {props.payBy.name}</div>
          </div>
        </div>
        <IconButton
          icon={FaTrashAlt}
          className="text-primary-500 hover:text-primary-600"
          onClick={() => open(<DeleteModal {...props} />)}
        />
      </div>
      <div>
        <Link
          className="text-2xl font-bold hover:text-primary-700"
          href={`/balance/${props.balanceId}/detail/${props.id}`}
        >
          {props.title}
          <FaPencilAlt className="inline text-sm ml-1" />
        </Link>
      </div>
      <div className="flex justify-between items-end">
        <div className="text-sm">
          {formatInTimeZone(
            props.date,
            Intl.DateTimeFormat().resolvedOptions().timeZone,
            "yyyy/MM/dd HH:mm",
          )}
        </div>
        <div>
          <div className="flex gap-1 justify-end items-center">
            <div className="text-sm">{currencyIcon[props.currency]}</div>
            <div className="text-lg font-bold">{props.amount}</div>
          </div>
          <div className="text-xs text-right">
            {props.shouldPay.map((user) => user.name).join(", ")}
          </div>
        </div>
      </div>
    </ListItemContainer>
  );
};
