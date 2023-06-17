/*
  Warnings:

  - You are about to drop the column `userId` on the `Detail` table. All the data in the column will be lost.
  - Added the required column `payById` to the `Detail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Detail" DROP CONSTRAINT "Detail_userId_fkey";

-- AlterTable
ALTER TABLE "Detail" DROP COLUMN "userId",
ADD COLUMN     "payById" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ShouldPay" (
    "id" SERIAL NOT NULL,
    "detailId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ShouldPay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_payById_fkey" FOREIGN KEY ("payById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShouldPay" ADD CONSTRAINT "ShouldPay_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "Detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShouldPay" ADD CONSTRAINT "ShouldPay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
