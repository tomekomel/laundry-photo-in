import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLocalisationToGallery1610400373309 implements MigrationInterface {
    name = 'AddLocalisationToGallery1610400373309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `gallery` ADD `latitude` float(10,6) NOT NULL");
        await queryRunner.query("ALTER TABLE `gallery` ADD `longitude` float(10,6) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `gallery` DROP COLUMN `longitude`");
        await queryRunner.query("ALTER TABLE `gallery` DROP COLUMN `latitude`");
    }

}
