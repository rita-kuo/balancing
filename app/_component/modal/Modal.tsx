import { IoClose } from '@/app/_lib/icons';
import { clickableIconStyle } from '@/app/_style/icons';
import { PropsWithChildren, useMemo } from 'react';
import ClickOutsideContainer from '../container/ClickOutsideContainer';

export interface ModalProps extends PropsWithChildren {
    closeWhenClickOutside?: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
    return (
        <ClickOutsideContainer
            onOutsideClick={
                (props.closeWhenClickOutside && props.onClose) || (() => {})
            }
            className='absolute top-0 bottom-0 left-0 right-0 bg-white h-max p-7 rounded m-auto w-screen md:w-[50vw]'
        >
            <IoClose
                className={`${clickableIconStyle} absolute right-4 top-4`}
                onClick={props.onClose}
            />
            {props.children}
        </ClickOutsideContainer>
    );
};

export default Modal;
