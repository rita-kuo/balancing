'use client';

import CurrencySelect from '@/app/_component/britad/balance/CurrencySelect';
import NumberInput from '@/app/_component/input/NumberInput';
import TextInput from '@/app/_component/input/TextInput';
import React, {
    HTMLProps,
    PropsWithChildren,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    Balance,
    Detail,
    Group,
    OwnerType,
    ShouldPay,
    User,
} from '@prisma/client';
import useLocalStorage from '@/app/_hook/useLocalStorage';
import GroupFields from './GroupFields';
import Button from '@/app/_component/button/Button';
import { get, post } from '@/app/_util/api';
import Modal from '@/app/_component/modal/Modal';
import { useModal } from '@/app/_hook/useModal';
import { useRouter } from 'next/navigation';
import DetailTypeSelect from '@/app/_component/britad/balance/DetailTypeSelect';

export const Field: React.FC<PropsWithChildren> = (props) => (
    <div className='flex items-center gap-2 mt-5'>{props.children}</div>
);

export const Title: React.FC<HTMLProps<HTMLDivElement>> = (props) => (
    <div className={`whitespace-nowrap ${props.className}`}>
        {props.children}
    </div>
);

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

    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState<BalanceType>({} as Balance);

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

    const [shouldPayList, setShouldPayList] = useState<Set<User>>(
        new Set(balance.group?.members)
    );

    const isValid = useMemo(
        () =>
            detail.title &&
            detail.amount &&
            (balance.ownerType !== 'GROUP' || shouldPayList.size),
        [detail, balance.ownerType, shouldPayList]
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
        <>
            <Field>
                <Title>項目</Title>
                <TextInput
                    value={detail.title}
                    onChange={(title) => setDetail({ ...detail, title })}
                />
            </Field>
            <Field>
                <Title>類型</Title>
                <DetailTypeSelect
                    type={detail.type}
                    onChange={(type) => setDetail({ ...detail, type })}
                />
            </Field>
            <Field>
                <Title>金額</Title>
                <CurrencySelect
                    value={detail.currency}
                    onChange={(currency) => setDetail({ ...detail, currency })}
                />
                <NumberInput
                    value={detail.amount}
                    onChange={(amount) => setDetail({ ...detail, amount })}
                    onFocus={(event) => {
                        if (!parseInt(event.target.value))
                            event.target.value = '';
                    }}
                />
            </Field>
            {balance.ownerType === OwnerType.GROUP && (
                <GroupFields
                    groupMembers={balance.group?.members || []}
                    payById={detail.payById}
                    setPayById={(payById) => setDetail({ ...detail, payById })}
                    shouldPayList={shouldPayList}
                    setShouldPayList={setShouldPayList}
                />
            )}
            <Button
                loading={loading}
                className='w-full justify-center mt-5'
                disabled={!isValid}
                onClick={() => {
                    setLoading(true);
                    post(`/api/balance/${balance.id}/detail`, {
                        ...detail,
                        shouldPayList: Array.from(shouldPayList).map(
                            (user) => ({
                                userId: user.id,
                            })
                        ),
                    } as Detail & { shouldPayList: ShouldPay[] })
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
                }}
            >
                新增
            </Button>
        </>
    );
};

export default CreateForm;
