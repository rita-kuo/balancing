'use client';

import { HTMLProps, useCallback, useEffect, useRef } from 'react';
import React from 'react';

interface ClickOutsideContainerProps extends HTMLProps<HTMLDivElement> {
    onOutsideClick: () => void;
}

const ClickOutsideContainer: React.FC<ClickOutsideContainerProps> = (props) => {
    const { onOutsideClick, ...divProps } = props;
    const container = useRef<HTMLDivElement>(null);
    const onClick = useCallback(
        (event: MouseEvent) => {
            if (
                !!container.current &&
                !(event.target as Node)?.contains(container.current) &&
                !container.current?.contains(event.target as Node)
            ) {
                onOutsideClick();
            }
        },
        [onOutsideClick]
    );
    useEffect(() => {
        addEventListener('mousedown', onClick);
        return () => removeEventListener('mousedown', onClick);
    }, [onClick]);
    return (
        <div ref={container} {...divProps}>
            {props.children}
        </div>
    );
};

export default ClickOutsideContainer;
