import React, { PropsWithChildren, ReactNode, useState } from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useClosing } from '../_hook/useClosing';

const Collapse: React.FC<PropsWithChildren<{ title: ReactNode }>> = (props) => {
    const [show, setShow] = useState(false);
    const { onClose, componentProps } = useClosing(
        () => setShow(false),
        {
            initial: {
                height: 0,
            },
            animate: {
                height: 'max-content',
            },
        },
        {
            initial: {
                height: 'max-content',
            },
            animate: {
                height: 0,
            },
        }
    );
    return (
        <div>
            <div
                className='flex justify-between items-center cursor-pointer'
                onClick={show ? onClose : () => setShow(true)}
            >
                <div className='flex-1'>{props.title}</div>
                {show ? <IoCaretUp /> : <IoCaretDown />}
            </div>
            {show && (
                <motion.div {...componentProps} className='overflow-hidden'>
                    {props.children}
                </motion.div>
            )}
        </div>
    );
};

export default Collapse;
