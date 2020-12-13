import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCountryTable1607859906520 implements MigrationInterface {
  name = 'AddCountryTable1607859906520';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `country` (`id` int NOT NULL AUTO_INCREMENT, `code` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `country`');
  }
}
