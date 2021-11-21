import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserDescriptionProperty1637527162038 implements MigrationInterface {
    name = 'AddUserDescriptionProperty1637527162038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `description` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `description`");
    }

}
