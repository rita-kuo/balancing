import Link from 'next/link';
import { HTMLProps, useMemo } from 'react';
import { IconType } from 'react-icons';

const disabled = 'text-gray-200';
const enabled = 'hover:text-primary-500';
const IconButton: React.FC<HTMLProps<HTMLDivElement> & { icon: IconType }> = (
    props
) => {
    const content = useMemo(
        () => (
            <div {...props} className={props.disabled ? disabled : enabled}>
                <props.icon />
            </div>
        ),
        [props]
    );

    return props.href && !props.disabled ? (
        <Link href={props.href}>{content}</Link>
    ) : (
        content
    );
};

export default IconButton;
