exports.up = (knex) => knex.schema.createTable('myFavorites', (table) => {
  table.increments('id').unsigned().notNullable();
  table.integer('idusuario');
  table.integer('idProduct').references('idProduct').inTable('product');
});
exports.down = (knex) => knex.schema.dropTable('myFavorites');
