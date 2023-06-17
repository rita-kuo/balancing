import { ModalContext } from '@/app/_context/ModalContext';
import { ReactElement, useContext } from 'react';

export const useModal = () => {
    const { setModal } = useContext(ModalContext);
    return {
        open: (modal: ReactElement) => setModal(modal),
        close: () => setModal(undefined),
    };
};
