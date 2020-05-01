const knex = require('knex');
const config = require('../configs/database');

const DB = knex(config);

module.exports = DB;
