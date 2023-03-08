import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1678278210391 implements MigrationInterface {
    name = 'firstMigration1678278210391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Bid" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric(8,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "announcementId" uuid, CONSTRAINT "PK_14a4e11b322b518b3002ed3e3e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(200) NOT NULL, "description" character varying(200) NOT NULL, "cpf" character varying(11) NOT NULL, "cell" character varying(12) NOT NULL, "birthDate" date NOT NULL, "accountType" character varying(15) NOT NULL, "cep" character varying(8) NOT NULL, "state" character varying(2) NOT NULL, "city" character varying(50) NOT NULL, "street" character varying(50) NOT NULL, "number" integer NOT NULL, "complement" character varying(20), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "UQ_fd04577de1de205c8a1f5297318" UNIQUE ("cpf"), CONSTRAINT "UQ_d221cf9104a9252429e03d08e34" UNIQUE ("cell"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "announcementId" uuid, "userId" uuid, CONSTRAINT "PK_fe8d6bf0fcb531dfa75f3fd5bdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Galery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, "announcementId" uuid, CONSTRAINT "PK_dc3998aa0963a7c2ce969bcd8e5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Announcement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "announceType" character varying(10) NOT NULL, "fabricationYear" integer NOT NULL, "km" integer NOT NULL, "price" numeric(8,2) NOT NULL, "description" text NOT NULL, "category" character varying(10) NOT NULL, "announceCover" text NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "userId" uuid, CONSTRAINT "PK_1aad4a24ede009867311c065675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Bid" ADD CONSTRAINT "FK_0fd2db3dd32120e1dc0b6ff2452" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Bid" ADD CONSTRAINT "FK_53183c742af185e49b09b2fb13f" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_77b3eb2ad10eba6ad21e09fd8a8" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_4c827119c9554affb8018d4da82" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Galery" ADD CONSTRAINT "FK_59516b85494fc954f92384a0445" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Announcement" ADD CONSTRAINT "FK_a1bbd010f187d2149b6000115ef" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Announcement" DROP CONSTRAINT "FK_a1bbd010f187d2149b6000115ef"`);
        await queryRunner.query(`ALTER TABLE "Galery" DROP CONSTRAINT "FK_59516b85494fc954f92384a0445"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_4c827119c9554affb8018d4da82"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_77b3eb2ad10eba6ad21e09fd8a8"`);
        await queryRunner.query(`ALTER TABLE "Bid" DROP CONSTRAINT "FK_53183c742af185e49b09b2fb13f"`);
        await queryRunner.query(`ALTER TABLE "Bid" DROP CONSTRAINT "FK_0fd2db3dd32120e1dc0b6ff2452"`);
        await queryRunner.query(`DROP TABLE "Announcement"`);
        await queryRunner.query(`DROP TABLE "Galery"`);
        await queryRunner.query(`DROP TABLE "Comment"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Bid"`);
    }

}
