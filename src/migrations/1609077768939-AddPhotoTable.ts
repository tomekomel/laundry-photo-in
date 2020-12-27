import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPhotoTable1609077768939 implements MigrationInterface {
    name = 'AddPhotoTable1609077768939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `photo` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `fileName` varchar(255) NOT NULL, `alt` varchar(255) NOT NULL, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted` datetime(6) NULL, `galleryId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `photo` ADD CONSTRAINT `FK_4bbd4c765dbb7ae423971f569b6` FOREIGN KEY (`galleryId`) REFERENCES `gallery`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `photo` DROP FOREIGN KEY `FK_4bbd4c765dbb7ae423971f569b6`");
        await queryRunner.query("DROP TABLE `photo`");
    }

}
