import { MigrationInterface, QueryRunner } from "typeorm";

export class Rabelodigital1725474139454 implements MigrationInterface {
    name = 'Rabelodigital1725474139454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ADD "capacity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "capacity"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "description"`);
    }

}
