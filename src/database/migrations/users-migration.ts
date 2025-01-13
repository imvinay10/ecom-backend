import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1627409267853 implements MigrationInterface {
  name = 'CreateUserTable1627409267853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create 'users' table with the columns and relations defined
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "roles" "public"."user_roles_enum" NOT NULL DEFAULT 'USER',
                "isActive" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
            )
        `);

    // Other table creation and constraints can be added here, including the relations to OrderEntity, CategoryEntity etc.
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the 'users' table if migration is rolled back
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
