import { MigrationInterface, QueryRunner } from "typeorm";

export class Rabelodigital1727463663428 implements MigrationInterface {
    name = 'Rabelodigital1727463663428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_station" ADD "activate" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "room" ADD "activate" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "locker" ADD "activate" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "garage" ADD "activate" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "garage" DROP COLUMN "activate"`);
        await queryRunner.query(`ALTER TABLE "locker" DROP COLUMN "activate"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "activate"`);
        await queryRunner.query(`ALTER TABLE "work_station" DROP COLUMN "activate"`);
    }

}
