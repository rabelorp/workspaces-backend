import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rabelodigital1724872201156 implements MigrationInterface {
  name = 'Rabelodigital1724872201156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "room" ("exclusive" character varying NOT NULL, "capacity" integer, "roomName" character varying NOT NULL, "location" character varying NOT NULL, "photoId" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room_reservation" ("observation" text, "roomId" character varying NOT NULL, "reservationDate" TIMESTAMP NOT NULL, "reservationTime" character varying NOT NULL, "userId" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b3fcbc70588b2d594890d2824b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_station" ADD "photoId" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "work_station" DROP COLUMN "photoId"`);
    await queryRunner.query(`DROP TABLE "room_reservation"`);
    await queryRunner.query(`DROP TABLE "room"`);
  }
}
