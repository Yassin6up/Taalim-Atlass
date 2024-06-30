/*
  Warnings:

  - You are about to drop the column `mattierId` on the `cours` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cours` DROP FOREIGN KEY `Cours_mattierId_fkey`;

-- AlterTable
ALTER TABLE `cours` DROP COLUMN `mattierId`,
    ADD COLUMN `listCorsesId` INTEGER NULL;

-- AlterTable
ALTER TABLE `video` ADD COLUMN `playListId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Lession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `mattierId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lession` ADD CONSTRAINT `Lession_mattierId_fkey` FOREIGN KEY (`mattierId`) REFERENCES `Mattier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_listCorsesId_fkey` FOREIGN KEY (`listCorsesId`) REFERENCES `Lession`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_playListId_fkey` FOREIGN KEY (`playListId`) REFERENCES `PlayList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
