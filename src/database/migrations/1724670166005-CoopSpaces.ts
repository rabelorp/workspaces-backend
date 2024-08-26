import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rabelodigital1724670166005 implements MigrationInterface {
  name = 'Rabelodigital1724670166005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "work_station" ADD "capacity" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "work_station" DROP COLUMN "capacity"`,
    );
  }
}
