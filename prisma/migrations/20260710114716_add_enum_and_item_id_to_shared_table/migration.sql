/*
  Warnings:

  - Added the required column `itemId` to the `shared` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `shared` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('folder', 'file');

-- AlterTable
ALTER TABLE "shared" ADD COLUMN     "itemId" INTEGER NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "FileType" NOT NULL;
