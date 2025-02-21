-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "gntClient" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "canceledAt" TIMESTAMP(3),
    "createdById" TEXT,
    "modifyById" TEXT,

    CONSTRAINT "gntClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gntAddress" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "gntAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gntUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "canceledAt" TIMESTAMP(3),

    CONSTRAINT "gntUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gntClient_email_key" ON "gntClient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "gntAddress_clientId_key" ON "gntAddress"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "gntUser_email_key" ON "gntUser"("email");

-- AddForeignKey
ALTER TABLE "gntClient" ADD CONSTRAINT "gntClient_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "gntUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gntClient" ADD CONSTRAINT "gntClient_modifyById_fkey" FOREIGN KEY ("modifyById") REFERENCES "gntUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gntAddress" ADD CONSTRAINT "gntAddress_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "gntClient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
