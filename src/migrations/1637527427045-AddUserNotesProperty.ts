import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserNotesProperty1637527427045 implements MigrationInterface {
    name = 'AddUserNotesProperty1637527427045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `notes` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `notes`");
    }

}
