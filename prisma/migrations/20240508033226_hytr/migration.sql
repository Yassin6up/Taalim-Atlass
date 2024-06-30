/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `mattier` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `dailyOpen` INTEGER NULL DEFAULT 0,
    ADD COLUMN `exirciseDone` INTEGER NULL DEFAULT 0,
    ADD COLUMN `filesRead` INTEGER NULL DEFAULT 0,
    ADD COLUMN `quizeDone` INTEGER NULL DEFAULT 0,
    ADD COLUMN `tasksDone` INTEGER NULL DEFAULT 0,
    ADD COLUMN `vediowsView` INTEGER NULL DEFAULT 0,
    MODIFY `xp` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `video` ADD COLUMN `views` INTEGER NULL;

-- DropTable
DROP TABLE `post`;

-- CreateTable
CREATE TABLE `Tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NULL,
    `videoId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mattier` ADD CONSTRAINT `Mattier_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Video`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
