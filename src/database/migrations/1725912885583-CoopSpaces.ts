import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rabelodigital1725912885583 implements MigrationInterface {
  name = 'Rabelodigital1725912885583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "garage" ("locationId" character varying NOT NULL, "garageName" character varying NOT NULL, "capacity" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_64031c73e02f698de3556b51dd9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "garage_reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4fb93ec0b90af373a7636dee190" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "exclusive"`);
    await queryRunner.query(
      `CREATE TYPE "public"."room_exclusive_enum" AS ENUM('diren', 'difin', 'adm', 'gth', 'suporte')`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD "exclusive" "public"."room_exclusive_enum" NOT NULL DEFAULT 'adm'`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_reservation" DROP COLUMN "roomId"`,
    );
    await queryRunner.query(`ALTER TABLE "room_reservation" ADD "roomId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "room_reservation" ADD CONSTRAINT "FK_3e746a89e8056dfa1c0f65d1ba9" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "room_reservation" DROP CONSTRAINT "FK_3e746a89e8056dfa1c0f65d1ba9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_reservation" DROP COLUMN "roomId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_reservation" ADD "roomId" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "exclusive"`);
    await queryRunner.query(`DROP TYPE "public"."room_exclusive_enum"`);
    await queryRunner.query(
      `ALTER TABLE "room" ADD "exclusive" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "garage_reservation"`);
    await queryRunner.query(`DROP TABLE "garage"`);
  }
}
