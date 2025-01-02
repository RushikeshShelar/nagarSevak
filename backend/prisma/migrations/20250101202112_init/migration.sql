/*
  Warnings:

  - You are about to drop the column `constituency` on the `Representative` table. All the data in the column will be lost.
  - Added the required column `party` to the `Representative` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Representative" DROP COLUMN "constituency",
ADD COLUMN     "party" TEXT NOT NULL;
