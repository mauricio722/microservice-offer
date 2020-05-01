exports.up = (knex) => knex.schema.createTable('paymentsReceived', (table) => {
  table.increments('id').unsigned().notNullable();
  table.integer('idusuario');
  table.integer('idProduct').references('idProduct').inTable('product');
  table.integer('value');
  table.timestamps(true, true);
});
exports.down = (knex) => knex.schema.dropTable('paymentsReceived');
