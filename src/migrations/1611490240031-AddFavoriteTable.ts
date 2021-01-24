import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFavoriteTable1611490240031 implements MigrationInterface {
    name = 'AddFavoriteTable1611490240031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `favorite` (`id` int NOT NULL AUTO_INCREMENT, `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted` datetime(6) NULL, `photoId` int NULL, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `favorite` ADD CONSTRAINT `FK_09620e3e4400619b5f838ebd6d2` FOREIGN KEY (`photoId`) REFERENCES `photo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `favorite` ADD CONSTRAINT `FK_83b775fdebbe24c29b2b5831f2d` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `favorite` DROP FOREIGN KEY `FK_83b775fdebbe24c29b2b5831f2d`");
        await queryRunner.query("ALTER TABLE `favorite` DROP FOREIGN KEY `FK_09620e3e4400619b5f838ebd6d2`");
        await queryRunner.query("DROP TABLE `favorite`");
    }

}
