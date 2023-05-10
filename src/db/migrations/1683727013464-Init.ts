import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1683727013464 implements MigrationInterface {
    name = 'Init1683727013464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite_genres" ("id" SERIAL NOT NULL, "genreId" numeric NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_64c9e1b2427eee8c2b710c64d52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(255) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorite_movies" ("id" SERIAL NOT NULL, "movieId" numeric NOT NULL, "watched" boolean NOT NULL DEFAULT false, "userId" uuid NOT NULL, CONSTRAINT "PK_7766c007e2e95de1d7a48953cbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite_genres" ADD CONSTRAINT "FK_6c6c06c2ea12ff68b8d2c58aacd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorite_movies" ADD CONSTRAINT "FK_ad08da426f2a5c6c7ba76a193ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_movies" DROP CONSTRAINT "FK_ad08da426f2a5c6c7ba76a193ad"`);
        await queryRunner.query(`ALTER TABLE "favorite_genres" DROP CONSTRAINT "FK_6c6c06c2ea12ff68b8d2c58aacd"`);
        await queryRunner.query(`DROP TABLE "favorite_movies"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "favorite_genres"`);
    }

}
