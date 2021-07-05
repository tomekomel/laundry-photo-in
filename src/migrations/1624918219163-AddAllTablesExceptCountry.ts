import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAllTablesExceptCountry1624918219163 implements MigrationInterface {
    name = 'AddAllTablesExceptCountry1624918219163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted` datetime(6) NULL, `uuid` varchar(36) NOT NULL, `active` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `favorite` (`id` int NOT NULL AUTO_INCREMENT, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted` datetime(6) NULL, `photoId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `photo` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `fileName` varchar(255) NOT NULL, `alt` varchar(255) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted` datetime(6) NULL, `galleryId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `gallery` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `slug` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `latitude` float(10,6) NOT NULL, `longitude` float(10,6) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted` datetime(6) NULL, `hits` int NOT NULL, `countryId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `comment` (`id` int NOT NULL AUTO_INCREMENT, `content` varchar(255) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted` datetime(6) NULL, `galleryId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `favorite` ADD CONSTRAINT `FK_09620e3e4400619b5f838ebd6d2` FOREIGN KEY (`photoId`) REFERENCES `photo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `favorite` ADD CONSTRAINT `FK_83b775fdebbe24c29b2b5831f2d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `photo` ADD CONSTRAINT `FK_4bbd4c765dbb7ae423971f569b6` FOREIGN KEY (`galleryId`) REFERENCES `gallery`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `gallery` ADD CONSTRAINT `FK_6acee7d9f6676643323c2cd9ae0` FOREIGN KEY (`countryId`) REFERENCES `country`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `gallery` ADD CONSTRAINT `FK_532a9bd29d33ca8b135fe5b2820` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_7018b2e1b76b1ba4a4b8faffce9` FOREIGN KEY (`galleryId`) REFERENCES `gallery`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_7018b2e1b76b1ba4a4b8faffce9`");
        await queryRunner.query("ALTER TABLE `gallery` DROP FOREIGN KEY `FK_532a9bd29d33ca8b135fe5b2820`");
        await queryRunner.query("ALTER TABLE `gallery` DROP FOREIGN KEY `FK_6acee7d9f6676643323c2cd9ae0`");
        await queryRunner.query("ALTER TABLE `photo` DROP FOREIGN KEY `FK_4bbd4c765dbb7ae423971f569b6`");
        await queryRunner.query("ALTER TABLE `favorite` DROP FOREIGN KEY `FK_83b775fdebbe24c29b2b5831f2d`");
        await queryRunner.query("ALTER TABLE `favorite` DROP FOREIGN KEY `FK_09620e3e4400619b5f838ebd6d2`");
        await queryRunner.query("DROP TABLE `comment`");
        await queryRunner.query("DROP TABLE `gallery`");
        await queryRunner.query("DROP TABLE `photo`");
        await queryRunner.query("DROP TABLE `favorite`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_065d4d8f3b5adb4a08841eae3c` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
