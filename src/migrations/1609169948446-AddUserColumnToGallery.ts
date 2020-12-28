import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserColumnToGallery1609169948446 implements MigrationInterface {
    name = 'AddUserColumnToGallery1609169948446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `gallery` ADD `userId` int NULL");
        await queryRunner.query("ALTER TABLE `gallery` ADD CONSTRAINT `FK_532a9bd29d33ca8b135fe5b2820` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `gallery` DROP FOREIGN KEY `FK_532a9bd29d33ca8b135fe5b2820`");
        await queryRunner.query("ALTER TABLE `gallery` DROP COLUMN `userId`");
    }

}
