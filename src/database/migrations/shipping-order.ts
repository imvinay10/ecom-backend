import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShippingsTable1633027013944 implements MigrationInterface {
  name = 'CreateShippingsTable1633027013944';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "shippings" (
        "id" SERIAL NOT NULL,
        "phone" VARCHAR NOT NULL,
        "name" VARCHAR NOT NULL DEFAULT ' ',
        "address" VARCHAR NOT NULL,
        "city" VARCHAR NOT NULL,
        "postCode" VARCHAR NOT NULL,
        "state" VARCHAR NOT NULL,
        "country" VARCHAR NOT NULL,
        "orderId" integer,
        CONSTRAINT "PK_shippings" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "shippings"
      ADD CONSTRAINT "FK_orderId" FOREIGN KEY ("orderId") REFERENCES "orders"("id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "shippings" DROP CONSTRAINT "FK_orderId"
    `);
    await queryRunner.query(`
      DROP TABLE "shippings"
    `);
  }
}
