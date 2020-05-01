exports.up = (knex) => knex.schema.createTable('product', (table) => {
  table.increments('idProduct').unsigned().notNullable();
  table.text('nameProduct').unsigned().notNullable();
  table.integer('image').unsigned().references('idimage').inTable('images');
  table.integer('idusuario');
  table.text('characteristics');
  table.integer('cost');
  table.integer('idstate').unsigned().references('idstate').inTable('state');
  table.integer('idcategory');
});
exports.down = (knex) => knex.schema.dropTable('product');
