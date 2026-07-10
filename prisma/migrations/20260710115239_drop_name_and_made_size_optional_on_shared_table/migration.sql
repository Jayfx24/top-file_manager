/*
  Warnings:

  - You are about to drop the column `name` on the `shared` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shared" DROP COLUMN "name",
ALTER COLUMN "size" DROP NOT NULL;
