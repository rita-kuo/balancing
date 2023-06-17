import { User as Origin } from '@prisma/client';
import { Group } from './group';

export type User = Origin & {
    group: Group[];
};

export type UserSearchArg = {
    notInGroup?: number;
};
