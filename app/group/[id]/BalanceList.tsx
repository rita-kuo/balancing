'use client';

import ListItemContainer from '@/app/_component/container/ListItemContainer';
import { currencyIcon } from '@/app/_constant/currency';
import { get } from '@/app/_util/api';
import { Balance, Balance as Model } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Balance: React.FC<Model> = (props) => {
    const icon = currencyIcon[props.currency];
    return (
        <Link href={`/balance/${props.id}`}>
            <ListItemContainer hoverStyle className='flex items-center gap-2'>
                {icon && <div className='text-primary-600'>{icon}</div>}
                <div>{props.name}</div>
            </ListItemContainer>
        </Link>
    );
};

const BalanceList: React.FC<{ groupId: number }> = (props) => {
    const [balanceList, setBalanceList] = useState<Balance[]>([]);

    useEffect(() => {
        get(`/api/balance?groupId=${props.groupId}`).then(setBalanceList);
    }, [props.groupId]);

    return (
        <div className='grid gap-1'>
            {balanceList.map((balance) => (
                <Balance key={`balance-${balance.id}`} {...balance} />
            ))}
        </div>
    );
};

export default BalanceList;
