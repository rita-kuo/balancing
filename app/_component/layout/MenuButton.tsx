'use client';

import { IoMenu } from '@/app/_lib/icons';
import { useModal } from '../../_hook/useModal';
import Menu from './menu/Menu';

const MenuButton: React.FC = (_) => {
    const { open, close } = useModal();
    return (
        <>
            <div
                className='absolute top-0 right-4 h-full flex items-center'
                onClick={() => open(<Menu onClose={close} />)}
            >
                <IoMenu className='h-1/2 w-auto text-white' />
            </div>
        </>
    );
};

export default MenuButton;
