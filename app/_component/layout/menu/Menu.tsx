import React from 'react';

import { IoClose } from '@/app/_lib/icons';
import { ModalProps } from '../../modal/Modal';
import { clickableIconStyle } from '@/app/_style/icons';
import MenuOptions from './MenuOption';
import ClickOutsideContainer from '../../container/ClickOutsideContainer';
import { useClosing } from '@/app/_hook/useClosing';
import { motion } from 'framer-motion';

interface MenuProps extends ModalProps {}

const Menu: React.FC<MenuProps> = (props) => {
    const { onClose, componentProps } = useClosing(props.onClose, {
        initial: { width: 0 },
        animate: { width: '' },
    });
    return (
        <ClickOutsideContainer onOutsideClick={onClose}>
            <motion.div
                {...componentProps}
                className='absolute top-0 right-0 w-[70vw] md:w-[20vw] h-screen bg-white overflow-hidden'
            >
                <div className='relative p-7'>
                    <IoClose
                        className={`${clickableIconStyle} ml-auto`}
                        onClick={onClose}
                    />
                    <div className='px-5 min-w-max'>
                        <MenuOptions onClose={onClose} />
                    </div>
                </div>
            </motion.div>
        </ClickOutsideContainer>
    );
};

export default Menu;
