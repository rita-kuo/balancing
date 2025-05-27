import Link from 'next/link';
import React, { ButtonHTMLAttributes, useMemo } from 'react';
import clsx from "clsx";

type ButtonAttr = ButtonHTMLAttributes<HTMLButtonElement>;
export interface ButtonProps extends ButtonAttr {
    href?: string;
    icon?: React.FC;
    loading?: boolean;
    defaultStyle?: string;
    hoverStyle?: string;
    disabledStyle?: string;
}

const style =
    'flex items-center justify-center gap-1 py-2 px-3 rounded select-none';
const defaultStyle = 'bg-primary-400';
const hoverStyle = 'hover:bg-primary-500';
const disabledStyle = 'disabled:bg-gray-200 disabled:text-gray-300';
const Button: React.FC<ButtonProps> = (props) => {
    const { icon, href, loading, type, children, ...buttonProps } = props;
    const content = useMemo(
        () => (
            <button
                {...buttonProps}
                type={type ?? 'button'}
                disabled={props.disabled || props.loading}
                className={clsx(
                    style,
                    props.defaultStyle ?? defaultStyle,
                    props.hoverStyle ?? hoverStyle,
                    props.disabledStyle ?? disabledStyle,
                    props.className)}
            >
                {props.icon && <props.icon />}
                {children}
            </button>
        ),
        [buttonProps, type, props, children]
    );
    return href ? <Link href={href}>{content}</Link> : content;
};

export default Button;
