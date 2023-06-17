import { Currency } from '@prisma/client';
import { ReactElement } from 'react';
import { IoLogoYen } from 'react-icons/io5';

export const currencyIcon: Partial<Record<Currency, ReactElement>> = {
    TWD: <div>TWD</div>,
    YEN: <IoLogoYen />,
};
