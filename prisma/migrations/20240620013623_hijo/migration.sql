/*
  Warnings:

  - You are about to drop the column `userId` on the `mattier` table. All the data in the column will be lost.
  - You are about to drop the column `videoId` on the `tasks` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `mattier` DROP FOREIGN KEY `Mattier_userId_fkey`;

-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `Tasks_videoId_fkey`;

-- AlterTable
ALTER TABLE `mattier` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `videoId`,
    ADD COLUMN `lessionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_lessionId_fkey` FOREIGN KEY (`lessionId`) REFERENCES `Lession`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
