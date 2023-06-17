import Logo from '../britad/Logo';
import MenuButton from './MenuButton';

const Header: React.FC = (_) => {
    return (
        <div className='relative flex justify-center py-2 bg-primary-800'>
            <Logo className='text-white' />
            <MenuButton />
        </div>
    );
};

export default Header;
