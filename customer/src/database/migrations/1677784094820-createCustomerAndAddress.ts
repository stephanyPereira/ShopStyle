import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCustomerAndAddress1677784094820
  implements MigrationInterface
{
  name = 'createCustomerAndAddress1677784094820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "district" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "cep" character varying NOT NULL, "complement" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "customerId" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "cpf" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "sex" character varying NOT NULL, "birthdate" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "active" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_dc34d382b493ade1f70e834c4d3" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_dc34d382b493ade1f70e834c4d3"`,
    );
    await queryRunner.query(`DROP TABLE "customer"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
