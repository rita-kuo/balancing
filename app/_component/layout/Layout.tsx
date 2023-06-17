import { PropsWithChildren } from 'react';
import Header from './Header';
import ModalContextProvider from '../modal/ModalContextProvider';

const Layout: React.FC<PropsWithChildren> = (props) => {
    return (
        <ModalContextProvider>
            <Header />
            <div className='md:max-w-4xl m-auto p-4'>{props.children}</div>
        </ModalContextProvider>
    );
};

export default Layout;
