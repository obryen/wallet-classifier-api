import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDbSync1688210226068 implements MigrationInterface {
    name = 'InitialDbSync1688210226068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token_configuration" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "network" character varying NOT NULL, "tokenAddress" character varying NOT NULL, "threshold" integer NOT NULL, "abi" character varying NOT NULL, "classification" character varying NOT NULL, CONSTRAINT "PK_711b468b37f301c72c6a3c16e07" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "token_configuration"`);
    }

}
