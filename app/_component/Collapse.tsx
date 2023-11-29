import React, {
    PropsWithChildren,
    ReactNode,
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useClosing } from '../_hook/useClosing';

interface Controller {
    opened: boolean;
    open: () => void;
    close: () => void;
}

export const useCollapse = () => useRef<Controller>(null);

const Collapse = forwardRef<
    Controller,
    PropsWithChildren<{ defaultOpen?: boolean; title: ReactNode }>
>((props, ref) => {
    const [show, setShow] = useState(props.defaultOpen || false);
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

    useImperativeHandle(ref, () => ({
        opened: show,
        open: () => setShow(true),
        close: onClose,
    }));

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
});

Collapse.displayName = 'Collapse';

export default Collapse;
