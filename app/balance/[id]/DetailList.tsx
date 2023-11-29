'use client';

import React from 'react';

import ListItemContainer from '@/app/_component/container/ListItemContainer';
import { DetailType } from '@prisma/client';
import { Detail } from '@/app/_model/balance';
import { currencyIcon } from '@/app/_constant/currency';
import { formatInTimeZone } from 'date-fns-tz';
import { useEffect, useState } from 'react';
import { get } from '@/app/_util/api';

const DetailItem: React.FC<Detail> = (props) => {
    return (
        <ListItemContainer className='[&>*]:w-full [&>*+*]:mt-2'>
            <div className='flex justify-between items-end text-sm'>
                <div className='flex items-center gap-1'>
                    {props.type === DetailType.EXPENSE ? (
                        <div className='font-bold text-red-400'>支出</div>
                    ) : (
                        <div className='font-bold text-lime-600'>收入</div>
                    )}
                    <div className='text-xs'>by {props.payBy.name}</div>
                </div>

                <div>
                    {formatInTimeZone(
                        props.date,
                        Intl.DateTimeFormat().resolvedOptions().timeZone,
                        'yyyy/MM/dd HH:mm'
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-1 md:flex-row'>
                <div className='text-2xl font-bold flex-1'>{props.title}</div>
                <div className='md:min-w-max'>
                    <div className='flex gap-1 justify-end items-center'>
                        <div className='text-xs'>
                            {currencyIcon[props.currency]}
                        </div>
                        <div className='text-lg font-bold'>{props.amount}</div>
                    </div>
                    <div className='text-xs text-right'>
                        {props.shouldPay.map((user) => user.name).join(', ')}
                    </div>
                </div>
            </div>
        </ListItemContainer>
    );
};

const DetailList: React.FC<{ balanceId: number; page: number }> = (props) => {
    const [details, setDetails] = useState<Detail[]>([]);
    const perpage = parseInt(process.env.NEXT_PUBLIC_PERPAGE || '10');

    useEffect(() => {
        get(
            `/api/balance/${props.balanceId}/detail?page=${props.page}&perPage=${perpage}`
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
