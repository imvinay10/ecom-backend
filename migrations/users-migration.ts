import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotNullConstraintToName1627409267853
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE users SET name = 'default_name' WHERE name IS NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE users ALTER COLUMN name SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ALTER COLUMN name DROP NOT NULL;`,
    );
  }
}
