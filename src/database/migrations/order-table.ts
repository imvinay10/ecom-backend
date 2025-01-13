import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersTable1633026813944 implements MigrationInterface {
  name = 'CreateOrdersTable1633026813944';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "orders" (
        "id" SERIAL NOT NULL,
        "orderAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "status" ENUM('PROCESSING', 'SHIPPED', 'DELIVERED') NOT NULL DEFAULT 'PROCESSING',
        "shippedAt" TIMESTAMP,
        "deliveredAt" TIMESTAMP,
        "updatedById" integer,
        "shippingAddressId" integer,
        "userId" integer,
        CONSTRAINT "PK_orders" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD CONSTRAINT "FK_updatedById" FOREIGN KEY ("updatedById") REFERENCES "users"("id")
    `);

    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD CONSTRAINT "FK_shippingAddressId" FOREIGN KEY ("shippingAddressId") REFERENCES "shippings"("id")
    `);

    await queryRunner.query(`
      ALTER TABLE "orders"
      ADD CONSTRAINT "FK_userId" FOREIGN KEY ("userId") REFERENCES "users"("id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "orders" DROP CONSTRAINT "FK_userId"
    `);
    await queryRunner.query(`
      ALTER TABLE "orders" DROP CONSTRAINT "FK_shippingAddressId"
    `);
    await queryRunner.query(`
      ALTER TABLE "orders" DROP CONSTRAINT "FK_updatedById"
    `);
    await queryRunner.query(`
      DROP TABLE "orders"
    `);
  }
}
