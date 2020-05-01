exports.up = (knex) => knex.schema.createTable('navigation', (table) => {
  table.increments('id').unsigned().notNullable();
  table.integer('idusuario');
  table.integer('idProduct').references('idProduct').inTable('product');
  table.integer('idCategory');
  table.integer('cost');
});
exports.down = (knex) => knex.schema.dropTable('navigation');
