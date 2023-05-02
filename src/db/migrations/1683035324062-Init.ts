import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683035324062 implements MigrationInterface {
    name = 'Init1683035324062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite_movies" ("userId" uuid NOT NULL, "movie" numeric NOT NULL, "watched" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ad08da426f2a5c6c7ba76a193ad" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(255) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_genres" ("userId" uuid NOT NULL, "genreId" numeric NOT NULL, CONSTRAINT "PK_6c6c06c2ea12ff68b8d2c58aacd" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "favorite_movies" ADD CONSTRAINT "FK_ad08da426f2a5c6c7ba76a193ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_genres" ADD CONSTRAINT "FK_6c6c06c2ea12ff68b8d2c58aacd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_genres" DROP CONSTRAINT "FK_6c6c06c2ea12ff68b8d2c58aacd"`);
        await queryRunner.query(`ALTER TABLE "favorite_movies" DROP CONSTRAINT "FK_ad08da426f2a5c6c7ba76a193ad"`);
        await queryRunner.query(`DROP TABLE "favorite_genres"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "favorite_movies"`);
    }

}
