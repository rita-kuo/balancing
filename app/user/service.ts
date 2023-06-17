import { User } from '@prisma/client';
import { execute } from '../_util/prisma';
import { UserSearchArg } from '../_model/user';

export default function userService() {
    return {
        getUsers: async (searchArg?: UserSearchArg) =>
            await execute((client) =>
                client.user.findMany({
                    where: {
                        group: searchArg?.notInGroup
                            ? {
                                  none: { id: searchArg.notInGroup },
                              }
                            : {},
                    },
                })
            ),
        createUser: async (user: User) =>
            await execute((client) => client.user.create({ data: user })),
    };
}
