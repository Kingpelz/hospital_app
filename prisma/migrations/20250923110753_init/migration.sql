/*
  Warnings:

  - You are about to drop the column `email` on the `doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[medicalLicense]` on the table `doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `medicalLicense` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."doctor_email_key";

-- AlterTable
ALTER TABLE "public"."doctor" DROP COLUMN "email",
ADD COLUMN     "medicalLicense" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "doctor_medicalLicense_key" ON "public"."doctor"("medicalLicense");
