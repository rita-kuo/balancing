'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Href: React.FC<{ href: string }> = (props) => {
    const router = useRouter();
    useEffect(() => {
        let count = 2;
        const interval = setInterval(() => {
            count -= 1;
            if (!count) {
                router.push(props.href);
                clearInterval(interval);
            }
        }, 1000);
    });
    return <></>;
};

export default Href;
