import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1678901687703 implements MigrationInterface {
    name = 'firstMigration1678901687703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Gallery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, "announcementId" uuid, CONSTRAINT "PK_38b7992772f7d64a93d7f188264" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Bid" DROP CONSTRAINT "FK_0fd2db3dd32120e1dc0b6ff2452"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_4c827119c9554affb8018d4da82"`);
        await queryRunner.query(`ALTER TABLE "Announcement" DROP CONSTRAINT "FK_a1bbd010f187d2149b6000115ef"`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "Bid" ADD CONSTRAINT "FK_0fd2db3dd32120e1dc0b6ff2452" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_4c827119c9554affb8018d4da82" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Gallery" ADD CONSTRAINT "FK_5d4db9ed5ac78fe42e8a1d339dc" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Announcement" ADD CONSTRAINT "FK_a1bbd010f187d2149b6000115ef" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Announcement" DROP CONSTRAINT "FK_a1bbd010f187d2149b6000115ef"`);
        await queryRunner.query(`ALTER TABLE "Gallery" DROP CONSTRAINT "FK_5d4db9ed5ac78fe42e8a1d339dc"`);
        await queryRunner.query(`ALTER TABLE "Comment" DROP CONSTRAINT "FK_4c827119c9554affb8018d4da82"`);
        await queryRunner.query(`ALTER TABLE "Bid" DROP CONSTRAINT "FK_0fd2db3dd32120e1dc0b6ff2452"`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Announcement" ADD CONSTRAINT "FK_a1bbd010f187d2149b6000115ef" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Comment" ADD CONSTRAINT "FK_4c827119c9554affb8018d4da82" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Bid" ADD CONSTRAINT "FK_0fd2db3dd32120e1dc0b6ff2452" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "Gallery"`);
    }

}
