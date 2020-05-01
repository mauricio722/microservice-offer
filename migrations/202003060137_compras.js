exports.up = (knex) => knex.schema.createTable('myShopping', (table) => {
  table.increments('id').unsigned().notNullable();
  table.integer('idusuario');
  table.integer('idProduct').references('idProduct').inTable('product');
});
exports.down = (knex) => knex.schema.dropTable('myShopping');
