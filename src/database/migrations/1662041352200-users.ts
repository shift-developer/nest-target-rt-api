import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1662041352200 implements MigrationInterface {
  name = 'users1662041352200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "email" character varying NOT NULL,
                "firstName" character varying(50) NOT NULL,
                "lastName" character varying(50) NOT NULL,
                "password" character varying NOT NULL,
                "gender" character(1) NOT NULL,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_951b8f1dfc94ac1d0301a14b7e" ON "users" ("uuid")
        `);
    await queryRunner.query(`
            CREATE UNIQUE INDEX "email_index_unique" ON "users" ("email")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX "public"."email_index_unique"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_951b8f1dfc94ac1d0301a14b7e"
        `);
    await queryRunner.query(`
            DROP TABLE "users"
        `);
  }
}
