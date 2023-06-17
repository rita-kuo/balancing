import {
    Balance as Origin,
    Group,
    Detail as OriginDetail,
    User,
    Currency,
} from '@prisma/client';

export interface Balance extends Origin {
    group?: Group;
    user?: User;
    details: OriginDetail[];
}

export interface Detail extends OriginDetail {
    balance: Balance;
    payBy: User;
    shouldPay: User[];
}

export type Spend = { [currency: string]: number };

export interface BalanceAnalysis {
    currencies: Currency[];
    users: (Pick<User, 'id' | 'name'> & { paid: Spend; shouldPay: Spend })[];
}
