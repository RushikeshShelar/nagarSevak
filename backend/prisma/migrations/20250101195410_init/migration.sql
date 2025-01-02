/*
  Warnings:

  - You are about to drop the `Sevak` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Sevak";

-- CreateTable
CREATE TABLE "Locality" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "district" TEXT,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Locality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Representative" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "constituency" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "officeAddress" TEXT,
    "localityId" TEXT NOT NULL,
    "termStart" TIMESTAMP(3),
    "termEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Representative_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Locality_name_idx" ON "Locality"("name");

-- CreateIndex
CREATE INDEX "Representative_designation_idx" ON "Representative"("designation");

-- CreateIndex
CREATE INDEX "Representative_localityId_idx" ON "Representative"("localityId");

-- AddForeignKey
ALTER TABLE "Representative" ADD CONSTRAINT "Representative_localityId_fkey" FOREIGN KEY ("localityId") REFERENCES "Locality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
