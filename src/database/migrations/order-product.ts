import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersProductsTable1633026913944
  implements MigrationInterface
{
  name = 'CreateOrdersProductsTable1633026913944';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "orders_products" (
        "id" SERIAL NOT NULL,
        "product_unit_price" DECIMAL(10, 2) NOT NULL DEFAULT 0,
        "product_quantity" INTEGER NOT NULL,
        "orderId" integer,
        "productId" integer,
        CONSTRAINT "PK_orders_products" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "orders_products"
      ADD CONSTRAINT "FK_orderId" FOREIGN KEY ("orderId") REFERENCES "orders"("id")
    `);

    await queryRunner.query(`
      ALTER TABLE "orders_products"
      ADD CONSTRAINT "FK_productId" FOREIGN KEY ("productId") REFERENCES "products"("id")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "orders_products" DROP CONSTRAINT "FK_productId"
    `);
    await queryRunner.query(`
      ALTER TABLE "orders_products" DROP CONSTRAINT "FK_orderId"
    `);
    await queryRunner.query(`
      DROP TABLE "orders_products"
    `);
  }
}
