/*
  Warnings:

  - Made the column `originalName` on table `files` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "files" ALTER COLUMN "originalName" SET NOT NULL;
