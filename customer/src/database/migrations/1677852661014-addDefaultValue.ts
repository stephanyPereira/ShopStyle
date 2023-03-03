import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDefaultValue1677852661014 implements MigrationInterface {
  name = 'addDefaultValue1677852661014';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "active" SET DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "active" DROP DEFAULT`,
    );
  }
}
