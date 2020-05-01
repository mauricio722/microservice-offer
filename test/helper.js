const Helpers = module.exports;
const db = require('../app/utils/DB');

Helpers.db = db;
Helpers.migrate = () => db.migrate.latest();
Helpers.clear = async () => {
  await db('myShopping').del();
  await db('product').del();
};
