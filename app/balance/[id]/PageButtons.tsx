'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { get } from '@/app/_util/api';
import Link from 'next/link';
import { IoCaretBackOutline, IoCaretForwardOutline } from 'react-icons/io5';
import { IoIosSkipBackward, IoIosSkipForward } from 'react-icons/io';
import IconButton from '@/app/_component/button/IconButton';

const PageButtons: React.FC<{ page: number; balanceId: number }> = (props) => {
    const perPage = process.env.NEXT_PUBLIC_PERPAGE;
    const [maxPage, setMaxPage] = useState<number>(0);

    const getPageUrl = useCallback(
        (page: number) => `/balance/${props.balanceId}?page=${page}`,
        [props.balanceId]
    );

    const pageOptions = useMemo(() => {
        let from = props.page - 2;
        let to = props.page + 2;
        while (from < 1) {
            from += 1;
            to += 1;
        }

        while (to > maxPage) {
            to -= 1;
            if (from - 1 >= 1) from -= 1;
        }

        return Array.from(
            {
                length: to - from + 1,
            },
            (_, index) => index + from
        );
    }, [props.page, maxPage]);

    useEffect(() => {
        get(`/api/balance/${props.balanceId}/detail/amount`).then((amount) =>
            setMaxPage(Math.ceil(amount / (perPage ? parseInt(perPage) : 10)))
        );
    }, [props.balanceId, perPage]);

    return (
        <div className='flex justify-center items-center gap-4'>
            <IconButton
                icon={IoIosSkipBackward}
                href={getPageUrl(1)}
                disabled={props.page === 1}
            />
            <IconButton
                icon={IoCaretBackOutline}
                href={getPageUrl(props.page - 1)}
                disabled={props.page === 1}
            />
            <div className='flex gap-1 w-max'>
                {pageOptions.map((page) => (
                    <Link key={`page-${page}`} href={getPageUrl(page)}>
                        <div
                            className={`p-1 rounded ${
                                page === props.page
                                    ? 'text-white bg-primary-800'
                                    : ''
                            }`}
                        >
                            {page}
                        </div>
                    </Link>
                ))}
            </div>
            <IconButton
                icon={IoCaretForwardOutline}
                href={getPageUrl(props.page + 1)}
                disabled={props.page >= maxPage}
            />
            <IconButton
                icon={IoIosSkipForward}
                href={getPageUrl(maxPage)}
                disabled={props.page >= maxPage}
            />
        </div>
    );
};

export default PageButtons;
