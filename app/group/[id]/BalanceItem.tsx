"use client";
import React from "react";
import { Balance as Model } from ".prisma/client";
import { currencyIcon } from "@/app/_constant/currency";
import Link from "next/link";
import ListItemContainer from "@/app/_component/container/ListItemContainer";
import { BiTrash } from "react-icons/all";
import { useModal } from "@/app/_hook/useModal";
import ConfirmModal from "@/app/_component/modal/ConfirmModal";
import { del } from "@/app/_util/api";

export const BalanceItem: React.FC<Model & { onDelete: () => void }> = (
  props,
) => {
  const icon = currencyIcon[props.currency];
  const { open, close } = useModal();

  return (
    <Link href={`/balance/${props.id}`}>
      <ListItemContainer
        hoverStyle
        className="flex items-center gap-2 justify-between"
      >
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary-600">{icon}</div>}
          <span>{props.name}</span>
        </div>
        <div
          className="p-2 rounded-full bg-primary-300 hover:bg-primary-400"
          onClick={(e) => {
            e.preventDefault();
            open(
              <ConfirmModal
                style="delete"
                title={`確認刪除收支表「${props.name}」？`}
                onClose={close}
                onConfirm={() =>
                  del(`/api/balance/${props.id}`).then(() => props.onDelete())
                }
              />,
            );
          }}
        >
          <BiTrash className="h-5 w-5" />
        </div>
      </ListItemContainer>
    </Link>
  );
};
