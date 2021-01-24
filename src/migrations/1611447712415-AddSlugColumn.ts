import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSlugColumn1611447712415 implements MigrationInterface {
    name = 'AddSlugColumn1611447712415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `gallery` ADD `slug` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `gallery` DROP COLUMN `slug`");
    }

}
