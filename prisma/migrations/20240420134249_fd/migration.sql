/*
  Warnings:

  - Added the required column `level` to the `Mattier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speciality` to the `Mattier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mattier` ADD COLUMN `level` VARCHAR(191) NOT NULL,
    ADD COLUMN `speciality` VARCHAR(191) NOT NULL;
