import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1703730627800 implements MigrationInterface {
    name = 'MyMigration1703730627800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reply" ("id" SERIAL NOT NULL, "content" character varying(500) NOT NULL, "image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "thread_id" integer, CONSTRAINT "PK_94fa9017051b40a71e000a2aff9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_ff320a60506a27ed687ed8e99b9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_9de109acf98f8f152881bcb6853" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_9de109acf98f8f152881bcb6853"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_ff320a60506a27ed687ed8e99b9"`);
        await queryRunner.query(`DROP TABLE "reply"`);
    }

}
