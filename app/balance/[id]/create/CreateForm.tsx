'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Balance, Detail, Group, OwnerType, User } from '@prisma/client';
import useLocalStorage from '@/app/_hook/useLocalStorage';
import GroupFields from './GroupFields';
import { get, post } from '@/app/_util/api';
import { useModal } from '@/app/_hook/useModal';
import { useRouter } from 'next/navigation';
import DetailTypeField from '@/app/_component/britad/balance/DetailTypeField';
import Form from '@/app/_component/form/Form';
import { InputField } from '@/app/_component/form/field/InputField';
import { CurrencySelect } from '@/app/_component/britad/balance/CurrencySelect';
import { FieldValues } from 'react-hook-form';
import SubmitButton from '@/app/_component/form/SubmitButton';
import Input from '@/app/_component/form/input/Input';
import Title from '@/app/_component/form/field/Title';
import Button from "@/app/_component/button/Button";
import OutlineButton from "@/app/_component/button/OutlineButton";

type CreateFormProps = {
    balanceId: number;
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

const CreateForm: React.FC<CreateFormProps> = (props) => {
    const localstorage = useLocalStorage();

    const [balance, setBalance] = useState<BalanceType>({} as Balance);
    const defaultCurrency = useMemo(() => balance.currency, [balance]);

    const { close } = useModal();
    const router = useRouter();

    const [detail, setDetail] = useState<Detail>({
        balanceId: balance.id,
        type: 'EXPENSE',
        title: '',
        amount: 0,
        currency: balance.currency,
        payById: parseInt(localstorage.get('userId') || ''),
    } as Detail);

    const onCreate = useCallback(
        async (data: FieldValues) => {
            data = {
                ...data,
                shouldPayList: (data.shouldPayList as number[]).map((num) => ({
                    userId: num,
                })),
            };
            await post(`/api/balance/${balance.id}/detail`, data)
                .then((_) => {
                    close();
                    router.push(
                        `/message?href=/balance/${balance.id}&message=新增成功`
                    );
                })
                .catch((err) => {
                    close();
                    router.push(
                        `/message?href=/balance/${balance.id}&message=新增失敗${err}`
                    );
                });
        },
        [balance, close, router]
    );

    useEffect(() => {
        get(`/api/balance/${props.balanceId}`).then(setBalance);
    }, [props.balanceId]);

    useEffect(() => {
        const defaultPayById =
            balance.ownerType === OwnerType.GROUP
                ? balance.group?.members[0]?.id || 0
                : 0;

        setDetail((detail) => ({
            ...detail,
            currency: balance.currency || 'TWD',
            payById: detail.payById || defaultPayById,
        }));
    }, [balance]);

    return (
        <Form
            onSubmit={onCreate}
            defaultValue={{
                balanceId: props.balanceId,
            }}
        >
            <InputField
                required
                label='項目'
                name='title'
                direction='horizontal'
            />
            <DetailTypeField />
            <div className='flex gap-2 items-center [&>*+*]:my-auto'>
                <Title required label='金額' />
                <CurrencySelect
                    name='currency'
                    defaultValue={defaultCurrency}
                />
                <Input type='number' name='amount' option={{ min: 1 }} />
            </div>
            {balance.ownerType === OwnerType.GROUP && (
                <GroupFields
                    groupMembers={balance.group?.members || []}
                    payById={detail.payById}
                    setPayById={(payById) => setDetail({ ...detail, payById })}
                />
            )}
            <div className='flex flex-col md:flex-row [&>*]:flex-1 [&>*]:shrink-0 w-full mt-5 gap-4'>
                <SubmitButton>
                    新增
                </SubmitButton>
                <OutlineButton href={ `/balance/${props.balanceId}` } className='w-full'>取消</OutlineButton>
            </div>
        </Form>
    );
};

export default CreateForm;
