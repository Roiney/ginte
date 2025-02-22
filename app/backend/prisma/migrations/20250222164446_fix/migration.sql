/*
  Warnings:

  - You are about to drop the `gntAddress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `gntClient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "gntAddress" DROP CONSTRAINT "gntAddress_clientId_fkey";

-- AlterTable
ALTER TABLE "gntClient" ADD COLUMN     "address" TEXT NOT NULL;

-- DropTable
DROP TABLE "gntAddress";
