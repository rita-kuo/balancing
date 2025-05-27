import { Balance, Detail, OwnerType, ShouldPay } from '@prisma/client';
import { execute } from '../_util/prisma';
import {
    BalanceAnalysis,
    Detail as DetailView,
    Spend,
} from '../_model/balance';

const BalanceService = () => {
    return {
        createBalance: async (balance: Balance) =>
            await execute((client) => client.balance.create({ data: balance })),
        getBalanceList: async (type: OwnerType, id: number) =>
            await execute((client) =>
                client.balance.findMany({
                    where: {
                        ownerType: type,
                        ownerId: id,
                    },
                    orderBy: {
                        start: 'desc',
                    }
                })
            ),
        getBalanceById: async (id: number) =>
            await execute((client) =>
                client.balance.findFirst({
                    where: { id },
                    include: {
                        group: {
                            include: {
                                members: true,
                            },
                        },
                    },
                })
            ),
        getBalanceAnalysis: async (id: number) =>
            await execute((client) =>
                client.balance
                    .findFirstOrThrow({
                        where: {
                            id,
                        },
                    })
                    .then(async (balance) => {
                        const currencies = (
                            await client.detail.findMany({
                                select: {
                                    currency: true,
                                },
                                distinct: ['currency'],
                            })
                        ).map((detail) => detail.currency);

                        const defaultSpend: Spend = {};
                        currencies.forEach(
                            (currency) => (defaultSpend[currency] = 0)
                        );

                        if (balance.ownerType === OwnerType.GROUP) {
                            const shouldPayDetail = await client.detail
                                .findMany({
                                    select: {
                                        currency: true,
                                        amount: true,
                                        shouldPayList: {
                                            select: {
                                                userId: true,
                                            },
                                        },
                                    },
                                    where: {
                                        balanceId: id,
                                    },
                                })
                                .then((details) => {
                                    const res: { [id: string]: Spend } = {};
                                    details.forEach((detail) => {
                                        const amount = Math.ceil(
                                            detail.amount /
                                                detail.shouldPayList.length
                                        );
                                        detail.shouldPayList.forEach(
                                            (shouldPay) => {
                                                const userId = shouldPay.userId;
                                                if (!res[userId])
                                                    res[userId] = {
                                                        ...defaultSpend,
                                                    };
                                                res[userId][detail.currency] +=
                                                    amount;
                                            }
                                        );
                                    });
                                    return res;
                                });
                            const paidDetail = await client.detail
                                .groupBy({
                                    by: ['payById', 'currency'],
                                    where: {
                                        balanceId: id,
                                    },
                                    _sum: {
                                        amount: true,
                                    },
                                })
                                .then((details) => {
                                    const res: {
                                        [id: string]: Spend;
                                    } = {};
                                    details.forEach((detail) => {
                                        res[detail.payById] =
                                            res[detail.payById] || {};
                                        res[detail.payById][detail.currency] =
                                            detail._sum.amount as number;
                                    });
                                    return res;
                                });
                            return await client.group
                                .findFirstOrThrow({
                                    where: {
                                        id: balance.ownerId,
                                    },
                                    select: {
                                        members: {
                                            select: {
                                                id: true,
                                                name: true,
                                            },
                                        },
                                    },
                                })
                                .then((group) => group.members)
                                .then(async (members) => {
                                    return {
                                        currencies,
                                        users: members.map((user) => ({
                                            ...user,
                                            paid: {
                                                ...defaultSpend,
                                                ...paidDetail[user.id],
                                            },
                                            shouldPay: {
                                                ...defaultSpend,
                                                ...shouldPayDetail[user.id],
                                            },
                                        })),
                                    } as BalanceAnalysis;
                                });
                        }
                    })
            ),
        createBalanceDetail: async (
            detail: Detail & { shouldPayList: ShouldPay[] }
        ) =>
            await execute((client) =>
                client.detail.create({
                    data: {
                        ...detail,
                        shouldPayList: {
                            create: detail.shouldPayList,
                        },
                    },
                })
            ),
        getDetailsByBalanceId: async (
            balanceId: number,
            page: number,
            perPage: number = process.env.PERPAGE
                ? parseInt(process.env.PERPAGE)
                : 10
        ) =>
            await execute((client) =>
                client.detail
                    .findMany({
                        skip: (page - 1) * perPage,
                        take: perPage,
                        where: {
                            balanceId,
                        },
                        orderBy: {
                            date: 'desc',
                        },
                        include: {
                            payBy: true,
                            shouldPayList: {
                                include: {
                                    user: true,
                                },
                            },
                        },
                    })
                    .then((res) => {
                        res.forEach(
                            (detail) =>
                                ((detail as unknown as DetailView).shouldPay =
                                    detail.shouldPayList.map(
                                        (info) => info.user
                                    ))
                        );
                        return res as unknown as DetailView[];
                    })
            ),
        getDetailAmount: async (balanceId: number) =>
            await execute((client) =>
                client.detail.count({ where: { balanceId: balanceId } })
            ),
    };
};

export default BalanceService;
