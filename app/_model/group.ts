import { Group as Origin, User } from '@prisma/client';
import { Balance } from './balance';

export type Group = Origin & {
    members: User[];
    balance: Balance[];
};
