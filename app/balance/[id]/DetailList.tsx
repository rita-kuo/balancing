"use client";

import React, { useEffect, useState } from "react";

import ListItemContainer from "@/app/_component/container/ListItemContainer";
import { Detail } from "@/app/_model/balance";
import { currencyIcon } from "@/app/_constant/currency";
import { formatInTimeZone } from "date-fns-tz";
import { get } from "@/app/_util/api";
import { DetailType } from "@prisma/client";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/all";

const DetailItem: React.FC<Detail> = (props) => {
  return (
    <ListItemContainer className="[&>*]:w-full space-y-2">
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

const DetailList: React.FC<{ balanceId: number; page: number }> = (props) => {
  const [details, setDetails] = useState<Detail[]>([]);
  const perpage = parseInt(process.env.NEXT_PUBLIC_PERPAGE || "10");

  useEffect(() => {
    get(
      `/api/balance/${props.balanceId}/detail?page=${props.page}&perPage=${perpage}`,
    ).then(setDetails);
  }, [props.balanceId, props.page, perpage]);

  return (
    <>
      {details.map((detail) => (
        <DetailItem key={`detail-${detail.id}`} {...detail} />
      ))}
    </>
  );
};

export default DetailList;
