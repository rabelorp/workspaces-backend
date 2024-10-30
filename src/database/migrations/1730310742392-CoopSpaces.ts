import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rabelodigital1730310742392 implements MigrationInterface {
  name = 'Rabelodigital1730310742392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."location_locationcategory_enum" AS ENUM('indoor', 'outdoor')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."location_locationtype_enum" AS ENUM('room', 'workstation', 'locker', 'garage')`,
    );
    await queryRunner.query(
      `CREATE TABLE "location" ("locationCategory" "public"."location_locationcategory_enum" NOT NULL DEFAULT 'indoor', "description" text, "locationType" "public"."location_locationtype_enum" NOT NULL DEFAULT 'workstation', "locationName" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "work_station" ("activate" boolean NOT NULL DEFAULT true, "photoId" character varying, "locationId" uuid NOT NULL, "stationName" character varying NOT NULL, "capacity" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_664931efb48b3b6aea55fb19a95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_353cbd519fd552849473b73a3f" ON "work_station" ("locationId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("position" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer NOT NULL, "statusId" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_75e2be4ce11d447ef43be0e374" UNIQUE ("photoId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."room_exclusive_enum" AS ENUM('diren', 'difin', 'adm', 'gth', 'suporte')`,
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("activate" boolean NOT NULL DEFAULT true, "exclusive" "public"."room_exclusive_enum" NOT NULL DEFAULT 'adm', "capacity" integer, "roomName" character varying NOT NULL, "locationId" uuid NOT NULL, "photoId" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7443454f937091459ed1d0b099" ON "room" ("locationId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "locker" ("activate" boolean NOT NULL DEFAULT true, "lockerName" character varying NOT NULL, "locationId" uuid NOT NULL, "photoId" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_295c0898cceea20ac8ee103d98d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bf24d81f063aa2ed2644bf46e2" ON "locker" ("locationId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "check_in" ("reservationId" uuid NOT NULL, "checkInDate" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9c026e16735aea10812a3888d6c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."locker_reservation_reservationtime_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."locker_reservation_reservationstatus_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "locker_reservation" ("reservationDate" date NOT NULL, "observation" text, "reservationTime" "public"."locker_reservation_reservationtime_enum" NOT NULL DEFAULT '1', "userId" uuid NOT NULL, "reservationStatus" "public"."locker_reservation_reservationstatus_enum" NOT NULL DEFAULT '2', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "lockerId" uuid NOT NULL, "checkInId" uuid, CONSTRAINT "PK_8530da9d60094ce6381b2997d73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f226cdbce69ba0dd975ddd104d" ON "locker_reservation" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0921b73c4f3920de33ede469c7" ON "locker_reservation" ("lockerId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c1180994ebd679ad7c8f500fd3" ON "locker_reservation" ("checkInId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."room_reservation_reservationstatus_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."room_reservation_reservationtime_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "room_reservation" ("lockerReservationId" uuid, "additionals" jsonb, "reservationStatus" "public"."room_reservation_reservationstatus_enum" NOT NULL DEFAULT '2', "userId" uuid NOT NULL, "observation" text, "reservationDate" date NOT NULL, "reservationTime" "public"."room_reservation_reservationtime_enum" NOT NULL DEFAULT '1', "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "roomId" uuid NOT NULL, "checkInId" uuid, CONSTRAINT "PK_b3fcbc70588b2d594890d2824b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_842298d8cbd4ef75f879535b13" ON "room_reservation" ("lockerReservationId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_165ef43915267caf0e142d6331" ON "room_reservation" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3e746a89e8056dfa1c0f65d1ba" ON "room_reservation" ("roomId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6eb46c79e3e6b9714ded69d53c" ON "room_reservation" ("checkInId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."work_station_reservation_reservationstatus_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."work_station_reservation_reservationtime_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "work_station_reservation" ("lockerReservationId" uuid, "reservationStatus" "public"."work_station_reservation_reservationstatus_enum" NOT NULL DEFAULT '2', "observation" text, "userId" uuid NOT NULL, "reservationTime" "public"."work_station_reservation_reservationtime_enum" NOT NULL DEFAULT '1', "reservationDate" date NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "checkInId" uuid, "workStationId" uuid NOT NULL, CONSTRAINT "PK_bb374aa5663e752d4fc5e7968ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ec79a7059b30e3c59d015e5051" ON "work_station_reservation" ("lockerReservationId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_25f8d06f5b2efb91d2ffe26503" ON "work_station_reservation" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_53a9bb1d459a7efaf9c63401ed" ON "work_station_reservation" ("checkInId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d19cd2c1f7b740d42152e23647" ON "work_station_reservation" ("workStationId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."garage_garagetype_enum" AS ENUM('car', 'motorcycle', 'bikecycle')`,
    );
    await queryRunner.query(
      `CREATE TABLE "garage" ("activate" boolean NOT NULL DEFAULT true, "garageType" "public"."garage_garagetype_enum" NOT NULL DEFAULT 'car', "photoId" character varying NOT NULL, "locationId" uuid NOT NULL, "garageName" character varying NOT NULL, "capacity" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_64031c73e02f698de3556b51dd9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2e2c9cbf7a94fd7eaa5d80e890" ON "garage" ("locationId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("entity" integer NOT NULL, "action" integer NOT NULL, "message" text NOT NULL, "userId" uuid NOT NULL, "read" boolean NOT NULL DEFAULT false, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1ced25315eb974b73391fb1c81" ON "notification" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."garage_reservation_reservationstatus_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."garage_reservation_reservationtime_enum" AS ENUM('1', '2', '3')`,
    );
    await queryRunner.query(
      `CREATE TABLE "garage_reservation" ("lockerReservationId" uuid, "vehiclePlate" character varying(7) NOT NULL, "reservationStatus" "public"."garage_reservation_reservationstatus_enum" NOT NULL DEFAULT '2', "userId" uuid NOT NULL, "observation" text, "reservationTime" "public"."garage_reservation_reservationtime_enum" NOT NULL DEFAULT '1', "reservationDate" date NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "garageId" uuid NOT NULL, "checkInId" uuid, CONSTRAINT "PK_4fb93ec0b90af373a7636dee190" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b54472211803f15bb98daf5118" ON "garage_reservation" ("lockerReservationId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0bd5844cb49ac2b22cb132c053" ON "garage_reservation" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8a77be0f14be3f854277d7b69c" ON "garage_reservation" ("garageId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bdebec8a7a2b1957775918ed8b" ON "garage_reservation" ("checkInId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "work_station" ADD CONSTRAINT "FK_353cbd519fd552849473b73a3f5" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_7443454f937091459ed1d0b0990" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "locker" ADD CONSTRAINT "FK_bf24d81f063aa2ed2644bf46e22" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "locker_reservation" ADD CONSTRAINT "FK_f226cdbce69ba0dd975ddd104da" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "locker_reservation" ADD CONSTRAINT "FK_0921b73c4f3920de33ede469c73" FOREIGN KEY ("lockerId") REFERENCES "locker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "locker_reservation" ADD CONSTRAINT "FK_c1180994ebd679ad7c8f500fd38" FOREIGN KEY ("checkInId") REFERENCES "check_in"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_reservation" ADD CONSTRAINT "FK_842298d8cbd4ef75f879535b13c" FOREIGN KEY ("lockerReservationId") REFERENCES "locker_reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_reservation" ADD CONSTRAINT "FK_165ef43915267caf0e142d63315" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_reservation" ADD CONSTRAINT "FK_3e746a89e8056dfa1c0f65d1ba9" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_reservation" ADD CONSTRAINT "FK_6eb46c79e3e6b9714ded69d53cf" FOREIGN KEY ("checkInId") REFERENCES "check_in"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_station_reservation" ADD CONSTRAINT "FK_ec79a7059b30e3c59d015e50516" FOREIGN KEY ("lockerReservationId") REFERENCES "locker_reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_station_reservation" ADD CONSTRAINT "FK_25f8d06f5b2efb91d2ffe265034" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_station_reservation" ADD CONSTRAINT "FK_53a9bb1d459a7efaf9c63401edf" FOREIGN KEY ("checkInId") REFERENCES "check_in"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_station_reservation" ADD CONSTRAINT "FK_d19cd2c1f7b740d42152e236479" FOREIGN KEY ("workStationId") REFERENCES "work_station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "garage" ADD CONSTRAINT "FK_2e2c9cbf7a94fd7eaa5d80e8906" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "garage_reservation" ADD CONSTRAINT "FK_b54472211803f15bb98daf5118a" FOREIGN KEY ("lockerReservationId") REFERENCES "locker_reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "garage_reservation" ADD CONSTRAINT "FK_0bd5844cb49ac2b22cb132c0531" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "garage_reservation" ADD CONSTRAINT "FK_8a77be0f14be3f854277d7b69c8" FOREIGN KEY ("garageId") REFERENCES "garage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "garage_reservation" ADD CONSTRAINT "FK_bdebec8a7a2b1957775918ed8b4" FOREIGN KEY ("checkInId") REFERENCES "check_in"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "garage_reservation" DROP CONSTRAINT "FK_bdebec8a7a2b1957775918ed8b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "garage_reservation" DROP CONSTRAINT "FK_8a77be0f14be3f854277d7b69c8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "garage_reservation" DROP CONSTRAINT "FK_0bd5844cb49ac2b22cb132c0531"`,
    );
    await queryRunner.query(
      `ALTER TABLE "garage_reservation" DROP CONSTRAINT "FK_b54472211803f15bb98daf5118a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "garage" DROP CONSTRAINT "FK_2e2c9cbf7a94fd7eaa5d80e8906"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_station_reservation" DROP CONSTRAINT "FK_d19cd2c1f7b740d42152e236479"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_station_reservation" DROP CONSTRAINT "FK_53a9bb1d459a7efaf9c63401edf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_station_reservation" DROP CONSTRAINT "FK_25f8d06f5b2efb91d2ffe265034"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_station_reservation" DROP CONSTRAINT "FK_ec79a7059b30e3c59d015e50516"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_reservation" DROP CONSTRAINT "FK_6eb46c79e3e6b9714ded69d53cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_reservation" DROP CONSTRAINT "FK_3e746a89e8056dfa1c0f65d1ba9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_reservation" DROP CONSTRAINT "FK_165ef43915267caf0e142d63315"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room_reservation" DROP CONSTRAINT "FK_842298d8cbd4ef75f879535b13c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "locker_reservation" DROP CONSTRAINT "FK_c1180994ebd679ad7c8f500fd38"`,
    );
    await queryRunner.query(
      `ALTER TABLE "locker_reservation" DROP CONSTRAINT "FK_0921b73c4f3920de33ede469c73"`,
    );
    await queryRunner.query(
      `ALTER TABLE "locker_reservation" DROP CONSTRAINT "FK_f226cdbce69ba0dd975ddd104da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "locker" DROP CONSTRAINT "FK_bf24d81f063aa2ed2644bf46e22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_7443454f937091459ed1d0b0990"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "work_station" DROP CONSTRAINT "FK_353cbd519fd552849473b73a3f5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bdebec8a7a2b1957775918ed8b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8a77be0f14be3f854277d7b69c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0bd5844cb49ac2b22cb132c053"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b54472211803f15bb98daf5118"`,
    );
    await queryRunner.query(`DROP TABLE "garage_reservation"`);
    await queryRunner.query(
      `DROP TYPE "public"."garage_reservation_reservationtime_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."garage_reservation_reservationstatus_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1ced25315eb974b73391fb1c81"`,
    );
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2e2c9cbf7a94fd7eaa5d80e890"`,
    );
    await queryRunner.query(`DROP TABLE "garage"`);
    await queryRunner.query(`DROP TYPE "public"."garage_garagetype_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d19cd2c1f7b740d42152e23647"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_53a9bb1d459a7efaf9c63401ed"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_25f8d06f5b2efb91d2ffe26503"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ec79a7059b30e3c59d015e5051"`,
    );
    await queryRunner.query(`DROP TABLE "work_station_reservation"`);
    await queryRunner.query(
      `DROP TYPE "public"."work_station_reservation_reservationtime_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."work_station_reservation_reservationstatus_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6eb46c79e3e6b9714ded69d53c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3e746a89e8056dfa1c0f65d1ba"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_165ef43915267caf0e142d6331"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_842298d8cbd4ef75f879535b13"`,
    );
    await queryRunner.query(`DROP TABLE "room_reservation"`);
    await queryRunner.query(
      `DROP TYPE "public"."room_reservation_reservationtime_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."room_reservation_reservationstatus_enum"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c1180994ebd679ad7c8f500fd3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0921b73c4f3920de33ede469c7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f226cdbce69ba0dd975ddd104d"`,
    );
    await queryRunner.query(`DROP TABLE "locker_reservation"`);
    await queryRunner.query(
      `DROP TYPE "public"."locker_reservation_reservationstatus_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."locker_reservation_reservationtime_enum"`,
    );
    await queryRunner.query(`DROP TABLE "check_in"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bf24d81f063aa2ed2644bf46e2"`,
    );
    await queryRunner.query(`DROP TABLE "locker"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7443454f937091459ed1d0b099"`,
    );
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(`DROP TYPE "public"."room_exclusive_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_353cbd519fd552849473b73a3f"`,
    );
    await queryRunner.query(`DROP TABLE "work_station"`);
    await queryRunner.query(`DROP TABLE "location"`);
    await queryRunner.query(`DROP TYPE "public"."location_locationtype_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."location_locationcategory_enum"`,
    );
  }
}
