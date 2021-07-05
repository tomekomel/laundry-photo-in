import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1613510836262 implements MigrationInterface {
    name = 'CreateUserTable1613510836262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted` datetime(6) NULL, `uuid` varchar(36) NOT NULL, `active` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `photo` DROP FOREIGN KEY `FK_4bbd4c765dbb7ae423971f569b6`");
        await queryRunner.query("ALTER TABLE `photo` CHANGE `galleryId` `galleryId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `favorite` ADD CONSTRAINT `FK_09620e3e4400619b5f838ebd6d2` FOREIGN KEY (`photoId`) REFERENCES `photo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `favorite` ADD CONSTRAINT `FK_83b775fdebbe24c29b2b5831f2d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `photo` ADD CONSTRAINT `FK_4bbd4c765dbb7ae423971f569b6` FOREIGN KEY (`galleryId`) REFERENCES `gallery`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `photo` DROP FOREIGN KEY `FK_4bbd4c765dbb7ae423971f569b6`");
        await queryRunner.query("ALTER TABLE `favorite` DROP FOREIGN KEY `FK_83b775fdebbe24c29b2b5831f2d`");
        await queryRunner.query("ALTER TABLE `favorite` DROP FOREIGN KEY `FK_09620e3e4400619b5f838ebd6d2`");
        await queryRunner.query("ALTER TABLE `photo` CHANGE `galleryId` `galleryId` int NULL");
        await queryRunner.query("ALTER TABLE `photo` ADD CONSTRAINT `FK_4bbd4c765dbb7ae423971f569b6` FOREIGN KEY (`galleryId`) REFERENCES `gallery`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_065d4d8f3b5adb4a08841eae3c` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
