import { MigrationInterface, QueryRunner } from "typeorm";

export class Rabelodigital1725990120277 implements MigrationInterface {
    name = 'Rabelodigital1725990120277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "garage_reservation" ADD "reservationDate" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "garage_reservation" DROP COLUMN "reservationDate"`);
    }

}
