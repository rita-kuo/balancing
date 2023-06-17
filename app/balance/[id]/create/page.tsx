import React from 'react';
import CreateForm from './CreateForm';
import { PageProps } from '@/app/_lib/next-type';

export default async function Page(props: PageProps) {
    const balanceId = parseInt(props.params.id);
    return (
        <div>
            <div>新增一筆記帳</div>
            <CreateForm balanceId={balanceId} />
        </div>
    );
}
