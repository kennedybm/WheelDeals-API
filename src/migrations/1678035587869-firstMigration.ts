import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1678035587869 implements MigrationInterface {
    name = 'firstMigration1678035587869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "description" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "description" SET DEFAULT 'Adding default value'`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "description" DROP NOT NULL`);
    }

}
