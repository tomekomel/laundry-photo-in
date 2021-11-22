import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveUserProperties1637619604009 implements MigrationInterface {
    name = 'RemoveUserProperties1637619604009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `notes`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `notes` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `description` varchar(255) NOT NULL");
    }

}
