/*
  Warnings:

  - You are about to drop the `patient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."patient" DROP CONSTRAINT "patient_doctorId_fkey";

-- DropTable
DROP TABLE "public"."patient";
