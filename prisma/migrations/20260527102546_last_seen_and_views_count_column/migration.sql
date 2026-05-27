/*
  Warnings:

  - Added the required column `lastSeen` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastSeen` to the `folders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastSeen` to the `shared` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "files" ADD COLUMN     "lastSeen" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "lastSeen" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "shared" ADD COLUMN     "lastSeen" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "viewsCount" INTEGER NOT NULL DEFAULT 0;
