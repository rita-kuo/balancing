import React from 'react';
import { Dispatch, SetStateAction, ReactElement } from 'react';

export const ModalContext = React.createContext<{
  setModal: Dispatch<SetStateAction<ReactElement | undefined>>;
}>({ setModal: () => {} });
