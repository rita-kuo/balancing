'use client';

import React from 'react';

import ListItemContainer from '@/app/_component/container/ListItemContainer';
import { currencyIcon } from '@/app/_constant/currency';
import { BalanceAnalysis } from '@/app/_model/balance';
import { get } from '@/app/_util/api';
import { useEffect, useState } from 'react';
import Collapse from '@/app/_component/Collapse';

interface AnalysisProps {
    balanceId: number;
}

const Analysis: React.FC<AnalysisProps> = (props) => {
    const [analysis, setAnalysis] = useState<BalanceAnalysis>();
    useEffect(() => {
        get(`/api/balance/${props.balanceId}/analysis`).then(setAnalysis);
    }, [props.balanceId]);

    return (
        <Collapse title={<div className='font-bold'>分析</div>}>
            <div className='[&>*+*]:mt-2 mt-2'>
                {analysis?.users.map((user) => {
                    const userAnalysis = analysis.currencies.map((currency) => {
                        const diff =
                            user.shouldPay[currency] - user.paid[currency];
                        return (
                            <div
                                key={currency}
                                className='flex items-center justify-between'
                            >
                                <div className='flex gap-1 items-center text-sm font-bold'>
                                    <div className='text-xs'>
                                        {currencyIcon[currency]}
                                    </div>
                                    {user.shouldPay[currency]}
                                </div>
                                {diff !== 0 && (
                                    <div className='flex gap-1 items-center text-xs'>
                                        {diff > 0 ? (
                                            <div className='text-red-400'>
                                                待支付
                                            </div>
                                        ) : (
                                            <div className='text-lime-600'>
                                                待收回
                                            </div>
                                        )}
                                        {currencyIcon[currency]}
                                        {Math.abs(diff)}
                                    </div>
                                )}
                            </div>
                        );
                    });

                    return (
                        <ListItemContainer
                            key={user.id}
                            className='border rounded p-2'
                        >
                            <div className='font-bold'>{user.name}</div>
                            <div>{userAnalysis}</div>
                        </ListItemContainer>
                    );
                })}
            </div>
        </Collapse>
    );
};

export default Analysis;
