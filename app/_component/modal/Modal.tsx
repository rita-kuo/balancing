import React from 'react';

import { IoClose } from '@/app/_lib/icons';
import { clickableIconStyle } from '@/app/_style/icons';
import { PropsWithChildren } from 'react';
import ClickOutsideContainer from '../container/ClickOutsideContainer';

export interface ModalProps extends PropsWithChildren {
    closeWhenClickOutside?: boolean;
    className?: string;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
    return (
        <ClickOutsideContainer
            onOutsideClick={
                (props.closeWhenClickOutside && props.onClose) || (() => {})
            }
            className={`absolute top-0 bottom-0 left-0 right-0 m-auto h-max md:w-max p-4 md:p-0`}
        >
            <div
                className={`relative bg-white h-max p-7 rounded my-auto w-full md:w-[50vw] ${props.className}`}
            >
                <IoClose
                    className={`${clickableIconStyle} absolute right-4 top-4`}
                    onClick={props.onClose}
                />
                {props.children}
            </div>
        </ClickOutsideContainer>
    );
};

export default Modal;
