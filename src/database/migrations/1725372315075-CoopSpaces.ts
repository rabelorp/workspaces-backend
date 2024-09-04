import { MigrationInterface, QueryRunner } from "typeorm";

export class Rabelodigital1725372315075 implements MigrationInterface {
    name = 'Rabelodigital1725372315075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_station_reservation" DROP COLUMN "reservationStatus"`);
        await queryRunner.query(`CREATE TYPE "public"."work_station_reservation_reservationstatus_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "work_station_reservation" ADD "reservationStatus" "public"."work_station_reservation_reservationstatus_enum" NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "room_reservation" DROP COLUMN "reservationStatus"`);
        await queryRunner.query(`CREATE TYPE "public"."room_reservation_reservationstatus_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "room_reservation" ADD "reservationStatus" "public"."room_reservation_reservationstatus_enum" NOT NULL DEFAULT '2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_reservation" DROP COLUMN "reservationStatus"`);
        await queryRunner.query(`DROP TYPE "public"."room_reservation_reservationstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "room_reservation" ADD "reservationStatus" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "work_station_reservation" DROP COLUMN "reservationStatus"`);
        await queryRunner.query(`DROP TYPE "public"."work_station_reservation_reservationstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "work_station_reservation" ADD "reservationStatus" boolean NOT NULL DEFAULT false`);
    }

}
