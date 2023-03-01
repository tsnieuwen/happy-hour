require('dotenv').config();
const { knexSnakeCaseMappers } = require('objection');
const { PG_USER, PG_PASSWORD } = process.env;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'happy_hour',
      user: PG_USER,
      password: PG_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds'
    },
    ...knexSnakeCaseMappers,
  },
};
