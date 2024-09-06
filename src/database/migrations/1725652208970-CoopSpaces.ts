import { MigrationInterface, QueryRunner } from "typeorm";

export class Rabelodigital1725652208970 implements MigrationInterface {
    name = 'Rabelodigital1725652208970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" RENAME COLUMN "location" TO "locationId"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "locationId"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "locationId" uuid`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_7443454f937091459ed1d0b0990" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_7443454f937091459ed1d0b0990"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "locationId"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "locationId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room" RENAME COLUMN "locationId" TO "location"`);
    }

}
