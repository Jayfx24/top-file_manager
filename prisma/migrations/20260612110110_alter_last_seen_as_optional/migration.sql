-- AlterTable
ALTER TABLE "files" ALTER COLUMN "lastSeen" DROP NOT NULL;

-- AlterTable
ALTER TABLE "folders" ALTER COLUMN "lastSeen" DROP NOT NULL;

-- AlterTable
ALTER TABLE "shared" ALTER COLUMN "lastSeen" DROP NOT NULL;
