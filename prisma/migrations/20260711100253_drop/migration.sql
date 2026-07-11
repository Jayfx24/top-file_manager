/*
  Warnings:

  - The primary key for the `shared` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `shared` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[generatedUrl]` on the table `shared` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "shared" DROP CONSTRAINT "shared_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "shared_pkey" PRIMARY KEY ("generatedUrl");

-- CreateIndex
CREATE UNIQUE INDEX "shared_generatedUrl_key" ON "shared"("generatedUrl");
