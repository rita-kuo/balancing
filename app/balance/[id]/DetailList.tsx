"use client";

import React, { useEffect, useState } from "react";

import ListItemContainer from "@/app/_component/container/ListItemContainer";
import { Detail } from "@/app/_model/balance";
import { currencyIcon } from "@/app/_constant/currency";
import { formatInTimeZone } from "date-fns-tz";
import { del, get } from "@/app/_util/api";
import { DetailType } from "@prisma/client";
import Link from "next/link";
import { FaPencilAlt, FaTrashAlt } from "react-icons/all";
import IconButton from "@/app/_component/button/IconButton";
import { useModal } from "@/app/_hook/useModal";
import Modal from "@/app/_component/modal/Modal";
import Button from "@/app/_component/button/Button";
import OutlineButton from "@/app/_component/button/OutlineButton";
import { useRouter } from "next/navigation";

const DeleteModal: React.FC<Detail> = (props) => {
  const { close } = useModal();
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [disabled, setDisabled] = useState<boolean>(false);
  return (
    <Modal onClose={close} closeWhenClickOutside>
      <div className="space-y-4">
        <h1>確認刪除？</h1>
        <div>{`是否確定刪除紀錄「${props.title}」？`}</div>
        <div className="flex items-center gap-2 [&>*]:w-full">
          <Button
            disabled={disabled}
            baseStyle="bg-red-200 text-red-500"
            hoverStyle="hover:bg-red-400 hover:text-white"
            onClick={() => {
              setDisabled(true);
              del(`/api/balance/${props.balanceId}/detail/${props.id}`)
                .then(() => {
                  console.log(props.balanceId);
                  close();
                  router.push(
                    `/message?href=/balance/${props.balanceId}&message=刪除成功`,
                  );
                })
                .catch(() => {
                  setError("刪除失敗，請稍後再試");
                  setDisabled(false);
                });
            }}
          >
            確定
          </Button>
          <OutlineButton onClick={close} disabled={disabled}>
            取消
          </OutlineButton>
        </div>
        <span className="text-red-500 text-sm">{error}</span>
      </div>
    </Modal>
  );
};

const DetailItem: React.FC<Detail> = (props) => {
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
