/*
  Warnings:

  - Added the required column `scheduleTime` to the `surgeries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."surgeries" ADD COLUMN     "scheduleTime" TIMESTAMP(3) NOT NULL;
