/*
  Warnings:

  - The primary key for the `gntAddress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `gntAddress` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `gntClient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `gntClient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdById` column on the `gntClient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `modifyById` column on the `gntClient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `gntUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `gntUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `clientId` on the `gntAddress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- DropForeignKey
ALTER TABLE "gntAddress" DROP CONSTRAINT "gntAddress_clientId_fkey";

-- DropForeignKey
ALTER TABLE "gntClient" DROP CONSTRAINT "gntClient_createdById_fkey";

-- DropForeignKey
ALTER TABLE "gntClient" DROP CONSTRAINT "gntClient_modifyById_fkey";

-- AlterTable
ALTER TABLE "gntAddress" DROP CONSTRAINT "gntAddress_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
DROP COLUMN "clientId",
ADD COLUMN     "clientId" UUID NOT NULL,
ADD CONSTRAINT "gntAddress_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "gntClient" DROP CONSTRAINT "gntClient_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
DROP COLUMN "createdById",
ADD COLUMN     "createdById" UUID,
DROP COLUMN "modifyById",
ADD COLUMN     "modifyById" UUID,
ADD CONSTRAINT "gntClient_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "gntUser" DROP CONSTRAINT "gntUser_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
ADD CONSTRAINT "gntUser_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "gntAddress_clientId_key" ON "gntAddress"("clientId");

-- AddForeignKey
ALTER TABLE "gntClient" ADD CONSTRAINT "gntClient_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "gntUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gntClient" ADD CONSTRAINT "gntClient_modifyById_fkey" FOREIGN KEY ("modifyById") REFERENCES "gntUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gntAddress" ADD CONSTRAINT "gntAddress_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "gntClient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
