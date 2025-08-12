"use client";
import React, { useState } from "react";
import { Detail } from "@/app/_model/balance";
import { useModal } from "@/app/_hook/useModal";
import { useRouter } from "next/navigation";
import Modal from "@/app/_component/modal/Modal";
import Button from "@/app/_component/button/Button";
import { del } from "@/app/_util/api";
import OutlineButton from "@/app/_component/button/OutlineButton";

export const DeleteModal: React.FC<Detail> = (props) => {
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
