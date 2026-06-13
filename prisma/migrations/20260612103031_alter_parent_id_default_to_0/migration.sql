/*
  Warnings:

  - Made the column `parentId` on table `folders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "folders" ALTER COLUMN "parentId" SET NOT NULL,
ALTER COLUMN "parentId" SET DEFAULT 0;
