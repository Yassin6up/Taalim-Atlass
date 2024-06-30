-- AlterTable
ALTER TABLE `playlist` ADD COLUMN `courseId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `PlayList` ADD CONSTRAINT `PlayList_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Cours`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
