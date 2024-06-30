/*
  Warnings:

  - Added the required column `photo` to the `Cours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cours` ADD COLUMN `photo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `mattier` ADD COLUMN `photo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `xp` INTEGER NULL;
