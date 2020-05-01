exports.up = (knex) => knex.schema.createTable('images', (table) => {
  table.increments('idimage').unsigned().notNullable();
  // usu
  table.text('url1');
  table.text('url2');
  table.text('url3');
});

exports.down = (knex) => knex.schema.dropTable('images');
