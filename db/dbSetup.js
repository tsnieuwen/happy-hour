const knex = require('knex');
const knexfile = require('./knexfile');
const { Model } = require('objection');
require('dotenv').config();
const { CONFIG_FRAGMENT } = process.env;
let db;

const setupDb = () => {
  db = (CONFIG_FRAGMENT === 'test') ? knex(knexfile.test) : knex(knexfile.development);
  Model.knex(db);
}

const disconnectDb = () => {
  db.destroy();
}

module.exports = { setupDb, disconnectDb }