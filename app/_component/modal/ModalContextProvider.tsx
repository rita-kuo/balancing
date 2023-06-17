'use client';

import React from 'react';

import { PropsWithChildren, ReactElement, useState } from 'react';
import Shadow from './Shadow';
import { ModalContext } from '@/app/_context/ModalContext';

const ModalContextProvider: React.FC<PropsWithChildren> = (props) => {
    const [modal, setModal] = useState<ReactElement>();
    return (
        <ModalContext.Provider value={{ setModal }}>
            {props.children}
            {modal && (
                <>
                    <Shadow />
                    {modal}
                </>
            )}
        </ModalContext.Provider>
    );
};
export default ModalContextProvider;
