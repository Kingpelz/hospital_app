/*
  Warnings:

  - You are about to drop the column `email` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `patient` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[medicalNo]` on the table `patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `age` to the `patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicalNo` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."patient_email_key";

-- AlterTable
ALTER TABLE "public"."patient" DROP COLUMN "email",
DROP COLUMN "phone",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "medicalNo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "patient_medicalNo_key" ON "public"."patient"("medicalNo");
