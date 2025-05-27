"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Balance, Detail, Group, OwnerType, User } from "@prisma/client";
import useLocalStorage from "@/app/_hook/useLocalStorage";
import GroupFields from "../create/GroupFields";
import { useModal } from "@/app/_hook/useModal";
import { useRouter } from "next/navigation";
import DetailTypeField from "@/app/_component/britad/balance/DetailTypeField";
import Form from "@/app/_component/form/Form";
import { InputField } from "@/app/_component/form/field/InputField";
import { CurrencySelect } from "@/app/_component/britad/balance/CurrencySelect";
import { FieldValues } from "react-hook-form";
import SubmitButton from "@/app/_component/form/SubmitButton";
import Input from "@/app/_component/form/input/Input";
import Title from "@/app/_component/form/field/Title";
import OutlineButton from "@/app/_component/button/OutlineButton";
import { post, put } from "@/app/_util/api";

type CreateFormProps = {
  balance: BalanceType;
  detail?: Detail & { shouldPayList: number[] };
};

type BalanceType = Partial<
  Balance & {
    user: User | null;
    group:
      | (Group & {
          members: User[];
        })
      | null;
  }
>;

const EditForm: React.FC<CreateFormProps> = (props) => {
  const localstorage = useLocalStorage();

  const defaultCurrency = useMemo(
    () => props.balance.currency,
    [props.balance],
  );

  const { close } = useModal();
  const router = useRouter();

  const [detail, setDetail] = useState<Detail>(
    props.detail ??
      ({
        balanceId: props.balance.id,
        type: "EXPENSE",
        title: "",
        amount: 0,
        currency: props.balance.currency,
        payById: parseInt(localstorage.get("userId") || ""),
      } as Detail),
  );

  const onCreate = useCallback(
    async (data: FieldValues) => {
      const isEdit = !!props.detail;
      data = {
        ...data,
        shouldPayList: (data.shouldPayList as number[]).map((num) => ({
          userId: num,
        })),
      };
      (isEdit
        ? put(`/api/balance/${props.balance.id}/detail/${props.detail}`, data)
        : post(`/api/balance/${props.balance.id}/detail`, data)
      )
        .then((_) => {
          close();
          router.push(
            `/message?href=/balance/${props.balance.id}&message=${isEdit ? "編輯" : "新增"}成功`,
          );
        })
        .catch((err) => {
          close();
          router.push(
            `/message?href=/balance/${props.balance.id}&message=${isEdit ? "編輯" : "新增"}失敗${err}`,
          );
        });
    },
    [props.balance, close, router, props.detail],
  );

  useEffect(() => {
    const defaultPayById =
      props.balance.ownerType === OwnerType.GROUP
        ? props.balance.group?.members[0]?.id || 0
        : 0;

    setDetail((detail) => ({
      ...detail,
      currency: props.balance.currency || "TWD",
      payById: detail.payById || defaultPayById,
    }));
  }, [props.balance]);

  return (
    <Form onSubmit={onCreate} defaultValue={detail}>
      <InputField required label="項目" name="title" direction="horizontal" />
      <DetailTypeField />
      <div className="flex gap-2 items-center [&>*+*]:my-auto">
        <Title required label="金額" />
        <CurrencySelect name="currency" defaultValue={defaultCurrency} />
        <Input type="number" name="amount" option={{ min: 1 }} />
      </div>
      {props.balance.ownerType === OwnerType.GROUP && (
        <GroupFields
          groupMembers={props.balance.group?.members || []}
          payById={detail.payById}
          setPayById={(payById) => setDetail({ ...detail, payById })}
        />
      )}
      <div className="flex flex-col md:flex-row [&>*]:flex-1 [&>*]:shrink-0 w-full mt-5 gap-4">
        <SubmitButton>{props.detail ? "儲存" : "新增"}</SubmitButton>
        <OutlineButton href={`/balance/${props.balance.id}`} className="w-full">
          取消
        </OutlineButton>
      </div>
    </Form>
  );
};

export default EditForm;
