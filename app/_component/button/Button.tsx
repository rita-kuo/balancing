import Link from 'next/link';
import React, { ButtonHTMLAttributes, useMemo } from 'react';

type ButtonAttr = ButtonHTMLAttributes<HTMLButtonElement>;
export interface ButtonProps extends ButtonAttr {
    href?: string;
    icon?: React.FC;
    loading?: boolean;
}

const style =
    'flex items-center gap-1 py-2 px-3 rounded select-none bg-primary-400';
const hoverStyle = 'hover:bg-primary-500';
const disabledStyle = 'disabled:bg-gray-200 disabled:text-gray-300';
const Button: React.FC<ButtonProps> = (props) => {
    const { icon, href, loading, ...buttonProps } = props;
    const content = useMemo(
        () => (
            <button
                {...buttonProps}
                disabled={props.disabled || props.loading}
                className={`${style} ${hoverStyle} ${disabledStyle} ${props.className}`}
            >
                {props.icon && <props.icon />}
                {buttonProps.children}
            </button>
        ),
        [props, buttonProps]
    );
    return href ? <Link href={href}>{content}</Link> : content;
};

export default Button;
