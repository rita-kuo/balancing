import { Group } from '@prisma/client';
import { execute } from '../_util/prisma';

export default function groupService() {
    return {
        getGroups: async () =>
            await execute((client) =>
                client.group.findMany({
                    include: {
                        members: true,
                    },
                })
            ),
        getGroupById: async (id: number) =>
            await execute((client) =>
                client.group.findFirst({
                    where: {
                        id: id,
                    },
                    include: {
                        members: true,
                        balance: {
                            where: {
                                ownerType: 'GROUP',
                            },
                        },
                    },
                })
            ),
        createGroup: async (group: Group) =>
            await execute((client) => client.group.create({ data: group })),
        getMemberOptions: async (id: number) =>
            await execute((client) =>
                client.user.findMany({
                    where: {
                        group: {
                            none: { id },
                        },
                    },
                })
            ),
        addMember: async (groupId: number, memberId: number) =>
            await execute((client) =>
                client.group.update({
                    where: {
                        id: groupId,
                    },
                    data: {
                        members: {
                            connect: {
                                id: memberId,
                            },
                        },
                    },
                })
            ),
    };
}
