import { MigrationInterface, QueryRunner } from "typeorm";

export class Rabelodigital1726231144982 implements MigrationInterface {
    name = 'Rabelodigital1726231144982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."location_locationtype_enum" AS ENUM('room', 'workstation', 'locker', 'garage')`);
        await queryRunner.query(`CREATE TABLE "location" ("description" character varying NOT NULL, "capacity" integer NOT NULL, "locationType" "public"."location_locationtype_enum" NOT NULL DEFAULT 'workstation', "locationName" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_station" ("photoId" character varying, "locationId" uuid NOT NULL, "stationName" character varying NOT NULL, "capacity" integer, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_664931efb48b3b6aea55fb19a95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."work_station_reservation_reservationstatus_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "work_station_reservation" ("reservationStatus" "public"."work_station_reservation_reservationstatus_enum" NOT NULL DEFAULT '2', "observation" text, "userId" integer NOT NULL, "reservationTime" character varying(50) NOT NULL, "reservationDate" date NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "workStationId" uuid, CONSTRAINT "PK_bb374aa5663e752d4fc5e7968ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("position" character varying, "id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_75e2be4ce11d447ef43be0e374" UNIQUE ("photoId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `);
        await queryRunner.query(`CREATE TYPE "public"."room_exclusive_enum" AS ENUM('diren', 'difin', 'adm', 'gth', 'suporte')`);
        await queryRunner.query(`CREATE TABLE "room" ("exclusive" "public"."room_exclusive_enum" NOT NULL DEFAULT 'adm', "capacity" integer, "roomName" character varying NOT NULL, "locationId" uuid NOT NULL, "photoId" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."room_reservation_reservationstatus_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "room_reservation" ("reservationStatus" "public"."room_reservation_reservationstatus_enum" NOT NULL DEFAULT '2', "userId" integer NOT NULL, "observation" text, "reservationDate" date NOT NULL, "reservationTime" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roomId" uuid, CONSTRAINT "PK_b3fcbc70588b2d594890d2824b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `);
        await queryRunner.query(`CREATE TYPE "public"."garage_garagetype_enum" AS ENUM('car', 'motorcycle', 'bikecycle')`);
        await queryRunner.query(`CREATE TABLE "garage" ("garageType" "public"."garage_garagetype_enum" NOT NULL DEFAULT 'car', "photoId" character varying NOT NULL, "locationId" uuid NOT NULL, "garageName" character varying NOT NULL, "capacity" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_64031c73e02f698de3556b51dd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."garage_reservation_reservationstatus_enum" AS ENUM('1', '2', '3')`);
        await queryRunner.query(`CREATE TYPE "public"."garage_reservation_reservationtime_enum" AS ENUM('matutino', 'vespertino', 'integral')`);
        await queryRunner.query(`CREATE TABLE "garage_reservation" ("vehiclePlate" character varying(7) NOT NULL, "reservationStatus" "public"."garage_reservation_reservationstatus_enum" NOT NULL DEFAULT '2', "userId" integer NOT NULL, "observation" text, "reservationTime" "public"."garage_reservation_reservationtime_enum" NOT NULL DEFAULT 'integral', "reservationDate" date NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "garageId" uuid, CONSTRAINT "PK_4fb93ec0b90af373a7636dee190" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "work_station" ADD CONSTRAINT "FK_353cbd519fd552849473b73a3f5" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_station_reservation" ADD CONSTRAINT "FK_d19cd2c1f7b740d42152e236479" FOREIGN KEY ("workStationId") REFERENCES "work_station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_7443454f937091459ed1d0b0990" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room_reservation" ADD CONSTRAINT "FK_3e746a89e8056dfa1c0f65d1ba9" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "garage" ADD CONSTRAINT "FK_2e2c9cbf7a94fd7eaa5d80e8906" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "garage_reservation" ADD CONSTRAINT "FK_8a77be0f14be3f854277d7b69c8" FOREIGN KEY ("garageId") REFERENCES "garage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "garage_reservation" DROP CONSTRAINT "FK_8a77be0f14be3f854277d7b69c8"`);
        await queryRunner.query(`ALTER TABLE "garage" DROP CONSTRAINT "FK_2e2c9cbf7a94fd7eaa5d80e8906"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "room_reservation" DROP CONSTRAINT "FK_3e746a89e8056dfa1c0f65d1ba9"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_7443454f937091459ed1d0b0990"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`);
        await queryRunner.query(`ALTER TABLE "work_station_reservation" DROP CONSTRAINT "FK_d19cd2c1f7b740d42152e236479"`);
        await queryRunner.query(`ALTER TABLE "work_station" DROP CONSTRAINT "FK_353cbd519fd552849473b73a3f5"`);
        await queryRunner.query(`DROP TABLE "garage_reservation"`);
        await queryRunner.query(`DROP TYPE "public"."garage_reservation_reservationtime_enum"`);
        await queryRunner.query(`DROP TYPE "public"."garage_reservation_reservationstatus_enum"`);
        await queryRunner.query(`DROP TABLE "garage"`);
        await queryRunner.query(`DROP TYPE "public"."garage_garagetype_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "room_reservation"`);
        await queryRunner.query(`DROP TYPE "public"."room_reservation_reservationstatus_enum"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TYPE "public"."room_exclusive_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "work_station_reservation"`);
        await queryRunner.query(`DROP TYPE "public"."work_station_reservation_reservationstatus_enum"`);
        await queryRunner.query(`DROP TABLE "work_station"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TYPE "public"."location_locationtype_enum"`);
    }

}
