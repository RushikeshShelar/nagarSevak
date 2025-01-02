/*
  Warnings:

  - You are about to drop the column `name` on the `Locality` table. All the data in the column will be lost.
  - Added the required column `area` to the `Locality` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Locality_name_idx";

-- AlterTable
ALTER TABLE "Locality" DROP COLUMN "name",
ADD COLUMN     "area" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Locality_area_idx" ON "Locality"("area");
