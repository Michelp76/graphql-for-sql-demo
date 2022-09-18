import knex from 'knex';
import knexStringCase from 'knex-stringcase';

const knexOptions = {
  client: 'postgresql',
  debug: process.env.DEBUG_KNEX === 'true',
  connection: {
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    user: process.env.DB_USER,
    password: process.env.PG_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

export const database = knex(knexStringCase(knexOptions));
