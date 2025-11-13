-- CreateEnum
CREATE TYPE "public"."SurgeryStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "public"."surgeries" ADD COLUMN     "status" "public"."SurgeryStatus" NOT NULL DEFAULT 'SCHEDULED';
