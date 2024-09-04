import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rabelodigital1725473379104 implements MigrationInterface {
  name = 'Rabelodigital1725473379104';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."location_locationtype_enum" AS ENUM('room', 'workstation', 'locker', 'garage')`,
    );
    await queryRunner.query(
      `CREATE TABLE "location" ("locationType" "public"."location_locationtype_enum" NOT NULL DEFAULT 'workstation', "locationName" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "location"`);
    await queryRunner.query(`DROP TYPE "public"."location_locationtype_enum"`);
  }
}
