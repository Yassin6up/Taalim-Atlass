-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `school` VARCHAR(191) NULL,
    `age` INTEGER NULL,
    `bio` VARCHAR(191) NULL,
    `xp` INTEGER NULL DEFAULT 0,
    `photo` VARCHAR(191) NULL,
    `level` VARCHAR(191) NULL,
    `vediowsView` INTEGER NULL DEFAULT 0,
    `filesRead` INTEGER NULL DEFAULT 0,
    `quizeDone` INTEGER NULL DEFAULT 0,
    `exirciseDone` INTEGER NULL DEFAULT 0,
    `tasksDone` INTEGER NULL DEFAULT 0,
    `dailyOpen` INTEGER NULL DEFAULT 0,
    `budget` VARCHAR(191) NULL,
    `niveauxEdu` VARCHAR(191) NULL,
    `Specialety` VARCHAR(191) NULL,
    `bacLangue` VARCHAR(191) NULL,
    `bac1Score` DOUBLE NULL,
    `bac2Score` DOUBLE NULL,
    `preferredUniversityFundingType` VARCHAR(191) NULL,
    `preferredServices` JSON NULL,
    `preferedCities` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mattier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `speciality` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `progress` INTEGER NULL,
    `color` VARCHAR(191) NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Mattier_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lession` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `mattierId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `progress` INTEGER NULL,
    `color` VARCHAR(191) NULL,
    `photo` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `speciality` VARCHAR(191) NOT NULL,
    `listCorsesId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `courseId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Video` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `views` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `playListId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NULL,
    `lessionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Lession` ADD CONSTRAINT `Lession_mattierId_fkey` FOREIGN KEY (`mattierId`) REFERENCES `Mattier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cours` ADD CONSTRAINT `Cours_listCorsesId_fkey` FOREIGN KEY (`listCorsesId`) REFERENCES `Lession`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayList` ADD CONSTRAINT `PlayList_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Cours`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_playListId_fkey` FOREIGN KEY (`playListId`) REFERENCES `PlayList`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_lessionId_fkey` FOREIGN KEY (`lessionId`) REFERENCES `Lession`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
