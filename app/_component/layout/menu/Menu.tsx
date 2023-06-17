import { IoClose } from '@/app/_lib/icons';
import { ModalProps } from '../../modal/Modal';
import { clickableIconStyle } from '@/app/_style/icons';
import MenuOptions from './MenuOption';
import ClickOutsideContainer from '../../container/ClickOutsideContainer';

interface MenuProps extends ModalProps {}

const Menu: React.FC<MenuProps> = (props) => {
    return (
        <ClickOutsideContainer
            onOutsideClick={props.onClose}
            className='absolute top-0 right-0 w-[70vw] md:w-[20vw] h-screen bg-white'
        >
            <div className='relative p-7'>
                <IoClose
                    className={`${clickableIconStyle} ml-auto`}
                    onClick={props.onClose}
                />
                <div className='px-5'>
                    <MenuOptions onClose={props.onClose} />
                </div>
            </div>
        </ClickOutsideContainer>
    );
};

export default Menu;
