import {MigrationInterface, QueryRunner} from "typeorm";

export class AddGalleryHits1611181547763 implements MigrationInterface {
    name = 'AddGalleryHits1611181547763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `gallery` ADD `hits` int NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `gallery` DROP COLUMN `hits`");
    }

}
