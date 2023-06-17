import Link from 'next/link';
import React, { useMemo } from 'react';

type TitleProps = {
    title: string;
    icon?: React.FC;
};

type HrefOption = TitleProps & {
    href: string;
};

type ParentOption = TitleProps & {
    children: (ParentOption | HrefOption)[];
};

const options: (ParentOption | HrefOption)[] = [
    {
        title: 'Hi, Rita',
        children: [
            // {
            //     title: '個人資料',
            //     href: '/user',
            // },
            // {
            //     title: '收支紀錄',
            //     href: '/balancing',
            // },
        ],
    },
    {
        title: '群組',
        href: '/group',
    },
    {
        title: '使用者管理',
        href: '/user',
    },
];

const Option: React.FC<
    { onClose: () => void } & (ParentOption | HrefOption)
> = (props) => {
    const content = useMemo(
        () => (
            <>
                <div className='flex my-4'>
                    {props.icon && <props.icon />}
                    {props.title}
                </div>
                {(props as ParentOption).children && (
                    <div className='ml-4'>
                        {(props as ParentOption).children.map(
                            (child, index) => (
                                <Option
                                    key={`option-${index}`}
                                    onClose={props.onClose}
                                    {...child}
                                />
                            )
                        )}
                    </div>
                )}
            </>
        ),
        [props]
    );

    return (props as HrefOption).href ? (
        <Link
            href={(props as HrefOption).href}
            onClick={props.onClose}
            className='hover:text-primary-500'
        >
            {content}
        </Link>
    ) : (
        <div className=''> {content} </div>
    );
};

const MenuOptions: React.FC<{ onClose: () => void }> = (props) => (
    <>
        {options.map((option, index) => (
            <Option
                key={`option-${index}`}
                onClose={props.onClose}
                {...option}
            />
        ))}
    </>
);

export default MenuOptions;
