-- CreateEnum
CREATE TYPE "Status" AS ENUM ('to_start', 'in_progress', 'completed');

-- CreateTable
CREATE TABLE "ProjectRequests" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assigned_pm_id" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'to_start',
    "deadline" DATE NOT NULL,

    CONSTRAINT "ProjectRequests_pkey" PRIMARY KEY ("id")
);
