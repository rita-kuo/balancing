'use client';

import React from 'react';

import ListItemContainer from '@/app/_component/container/ListItemContainer';
import { currencyIcon } from '@/app/_constant/currency';
import { BalanceAnalysis } from '@/app/_model/balance';
import { get } from '@/app/_util/api';
import { useEffect, useState } from 'react';
import Collapse, { useCollapse } from '@/app/_component/Collapse';
import { useSearchParams } from 'next/navigation';

interface AnalysisProps {
    balanceId: number;
}

const Analysis: React.FC<AnalysisProps> = (props) => {
    const collapse = useCollapse();
    const [analysis, setAnalysis] = useState<BalanceAnalysis>();
    const param = useSearchParams();

    useEffect(() => {
        get(`/api/balance/${props.balanceId}/analysis`).then(setAnalysis);
    }, [props.balanceId]);

    useEffect(() => {
        if (collapse.current?.opened) {
            collapse.current.close();
        }
    }, [param, collapse]);

    return (
        <Collapse ref={collapse} title={<div className='font-bold'>分析</div>}>
            <div className='grid md:grid-cols-3 gap-2 mt-2'>
                {analysis?.users.map((user) => {
                    const userAnalysis = analysis.currencies
                        .filter(
                            (currency) =>
                                !!user.shouldPay[currency] ||
                                !!user.paid[currency]
                        )
                        .map((currency) => {
                            const diff =
                                user.shouldPay[currency] - user.paid[currency];
                            return (
                                <div
                                    key={currency}
                                    className='flex items-center justify-between'
                                >
                                    <div className='flex gap-1 items-center text-sm'>
                                        <div className='text-xs flex gap-1'>
                                            {currencyIcon[currency]}
                                        </div>
                                        <div className='font-bold'>
                                            {user.shouldPay[currency]}
                                        </div>
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
