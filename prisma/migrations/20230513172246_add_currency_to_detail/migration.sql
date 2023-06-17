/*
  Warnings:

  - Added the required column `currency` to the `Detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Detail" ADD COLUMN     "currency" "Currency" NOT NULL;
