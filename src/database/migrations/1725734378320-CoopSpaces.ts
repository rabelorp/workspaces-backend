import { MigrationInterface, QueryRunner } from "typeorm";

export class Rabelodigital1725734378320 implements MigrationInterface {
    name = 'Rabelodigital1725734378320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_station" RENAME COLUMN "location" TO "locationId"`);
        await queryRunner.query(`ALTER TABLE "work_station" DROP COLUMN "locationId"`);
        await queryRunner.query(`ALTER TABLE "work_station" ADD "locationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_7443454f937091459ed1d0b0990"`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "locationId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_station" ADD CONSTRAINT "FK_353cbd519fd552849473b73a3f5" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_7443454f937091459ed1d0b0990" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_7443454f937091459ed1d0b0990"`);
        await queryRunner.query(`ALTER TABLE "work_station" DROP CONSTRAINT "FK_353cbd519fd552849473b73a3f5"`);
        await queryRunner.query(`ALTER TABLE "room" ALTER COLUMN "locationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_7443454f937091459ed1d0b0990" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_station" DROP COLUMN "locationId"`);
        await queryRunner.query(`ALTER TABLE "work_station" ADD "locationId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "work_station" RENAME COLUMN "locationId" TO "location"`);
    }

}
