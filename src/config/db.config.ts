import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as Entities from '../lib/entities';
import * as Migrations from '../migrations';

const entities = Object.values(Entities);
const migrations = Object.values(Migrations);

export const dbConfig = () => ({
  DATABASE: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    logging: true,
    entities,
    migrations,
    migrationsRun: true,
  } as PostgresConnectionOptions,
});
