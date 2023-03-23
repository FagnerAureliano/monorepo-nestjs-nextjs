-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_clientId_fkey";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
