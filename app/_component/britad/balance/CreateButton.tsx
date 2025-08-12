"use client";

import { useModal } from "@/app/_hook/useModal";
import Button from "../../button/Button";
import Modal, { ModalProps } from "../../modal/Modal";
import React, { useCallback } from "react";
import { OwnerType } from "@prisma/client";
import { useRouter } from "next/navigation";
import Form from "../../form/Form";
import { FieldValues } from "react-hook-form";
import { InputField } from "../../form/field/InputField";
import SubmitButton from "../../form/SubmitButton";
import { post } from "@/app/_util/api";
import { CurrencySelectField } from "./CurrencySelect";

type BalaceProps = {
  ownerId: number;
  ownerType: OwnerType;
};

const createBalance = "新增收支表";
type CreateModalProps = ModalProps & BalaceProps;

const CreateModal: React.FC<CreateModalProps> = (props) => {
  const { close } = useModal();
  const router = useRouter();

  const onCreate = useCallback(
    async (data: FieldValues) => {
      await post(`/api/balance`, data)
        .then(() => {
          close();
          router.push(`/message?href=/group/${props.ownerId}&message=新增成功`);
        })
        .catch((err) => {
          close();
          router.push(
            `/message?href=/group/${props.ownerId}&message=新增失敗${err}`,
          );
        });
    },
    [router, close, props.ownerId],
  );

  return (
    <Modal {...props} closeWhenClickOutside>
      <Form
        className="w-full"
        onSubmit={onCreate}
        defaultValue={{
          start: new Date(Date.now()),
          ownerType: props.ownerType,
          ownerId: props.ownerId,
        }}
      >
        <h1>{createBalance}</h1>
        <InputField required label="名稱" name="name" />
        <CurrencySelectField name="currency" label="預設幣別" />
        <SubmitButton className="w-full justify-center">新增</SubmitButton>
      </Form>
    </Modal>
  );
};

const CreateBalanceButton: React.FC<BalaceProps> = (props) => {
  const { open, close } = useModal();
  return (
    <Button
      className="ml-auto"
      onClick={() => open(<CreateModal {...props} onClose={close} />)}
    >
      {createBalance}
    </Button>
  );
};

export default CreateBalanceButton;
