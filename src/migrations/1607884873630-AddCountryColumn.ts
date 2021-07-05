import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCountryColumn1607884873630 implements MigrationInterface {
    name = 'AddCountryColumn1607884873630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `gallery` ADD `countryId` int NULL");
        await queryRunner.query("ALTER TABLE `gallery` ADD CONSTRAINT `FK_6acee7d9f6676643323c2cd9ae0` FOREIGN KEY (`countryId`) REFERENCES `country`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `gallery` DROP FOREIGN KEY `FK_6acee7d9f6676643323c2cd9ae0`");
        await queryRunner.query("ALTER TABLE `gallery` DROP COLUMN `countryId`");
    }

}
