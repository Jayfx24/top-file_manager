-- AddForeignKey
ALTER TABLE "shared" ADD CONSTRAINT "shared_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
