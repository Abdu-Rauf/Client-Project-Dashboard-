/*
  Warnings:

  - The `status` column on the `ProjectRequests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProjectRequestStatus" AS ENUM ('assigned', 'converted');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('in_progress', 'completed');

-- AlterTable
ALTER TABLE "ProjectRequests" DROP COLUMN "status",
ADD COLUMN     "status" "ProjectRequestStatus" NOT NULL DEFAULT 'assigned';

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "project_request_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assigned_pm_id" INTEGER NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'in_progress',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_request_id_key" ON "Project"("project_request_id");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_project_request_id_fkey" FOREIGN KEY ("project_request_id") REFERENCES "ProjectRequests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
