import { User } from "@prisma/client";
import { execute } from "../_util/prisma";
import { UserSearchArg } from "../_model/user";
import UserBriefing from "@/app/_model/dto/UserBriefing";

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
        }),
      ),
    createUser: async (user: User) =>
      await execute((client) => client.user.create({ data: user })),
    getPersonalBriefing: async (userId: number): Promise<UserBriefing> => {
      const detailIn30Days = await execute((client) =>
        client.detail.findMany({
          where: {
            shouldPayList: {
              some: {
                userId: userId,
              },
            },
            date: {
              gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
            type: "EXPENSE",
          },
          select: {
            balance: true,
            amount: true,
          },
        }),
      );

      const summaryIn30Days = detailIn30Days.reduce(
        (summary, detail) => {
          summary.totalAmount += detail.amount;
          summary.totalCount += 1;

          if (summary.detailMap[detail.balance.id]) {
            summary.detailMap[detail.balance.id].totalCount += 1;
            summary.detailMap[detail.balance.id].totalAmount += detail.amount;
          } else {
            summary.detailMap[detail.balance.id] = {
              balanceName: detail.balance.name,
              totalAmount: detail.amount,
              totalCount: 1,
            };
          }
          return summary;
        },
        {
          totalAmount: 0,
          totalCount: 0,
          detailMap: {} as Record<
            number,
            {
              balanceName: string;
              totalAmount: number;
              totalCount: number;
            }
          >,
        },
      );

      const toPercentage = (value: number) => Math.floor(value * 1000) / 10;
      const expensePercentageIn30Days = Object.values(summaryIn30Days.detailMap)
        .map((detail) => ({
          ...detail,
          amountPercentage: toPercentage(
            detail.totalAmount / summaryIn30Days.totalAmount,
          ),
          countPercentage: toPercentage(
            detail.totalCount / summaryIn30Days.totalCount,
          ),
        }))
        .sort((prev, curr) => curr.totalAmount - prev.totalAmount);

      if (expensePercentageIn30Days.length > 5) {
        expensePercentageIn30Days.push(
          expensePercentageIn30Days
            .splice(4, expensePercentageIn30Days.length - 1)
            .reduce(
              (other, curr) => {
                other.totalAmount += curr.totalAmount;
                other.amountPercentage += curr.amountPercentage;
                other.totalCount += curr.totalCount;
                other.countPercentage += curr.countPercentage;
                return other;
              },
              {
                balanceName: "其他",
                totalAmount: 0,
                amountPercentage: 0,
                totalCount: 0,
                countPercentage: 0,
              },
            ),
        );
      }

      return {
        expensePercentageIn30Days,
      } as UserBriefing;
    },
  };
}
