interface UserBriefing {
  expensePercentageIn30Days: {
    balanceName: string;
    totalAmount: number;
    amountPercentage: number;
    totalCount: number;
    countPercentage: number;
  }[];
}

export default UserBriefing;
