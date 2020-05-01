exports.up = (knex) => knex.schema.alterTable('navigation', (table) => {
  table.integer('idstate').unsigned();
});
exports.down = (knex) => knex.schema.dropTable('navigation');
