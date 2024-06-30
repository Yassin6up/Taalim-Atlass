/*
  Warnings:

  - Added the required column `level` to the `Cours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speciality` to the `Cours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cours` ADD COLUMN `level` VARCHAR(191) NOT NULL,
    ADD COLUMN `speciality` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PlayList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
