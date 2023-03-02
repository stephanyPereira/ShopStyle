import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';
import { join } from 'path';
config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [join(__dirname, '..', 'database', 'migrations', '*.{ts,js}')],
  entities: [join(__dirname, '..', '**', 'entities', '*.entity.{ts,js}')],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export default typeOrmConfig;
