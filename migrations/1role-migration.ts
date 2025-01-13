import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1627409267853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the enum type for 'roles'
    await queryRunner.query(`
      CREATE TYPE user_roles_enum AS ENUM ('admin', 'user', 'guest');
    `);

    // Now create the 'users' table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "roles" "public"."user_roles_enum" NOT NULL DEFAULT 'user',
        "isActive" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the users table
    await queryRunner.query('DROP TABLE "users"');
    // Drop the enum type if the table is removed
    await queryRunner.query('DROP TYPE "public"."user_roles_enum"');
  }
}
