exports.up = (knex) => knex.schema.createTable('state', (table) => {
  table.increments('idstate').unsigned().notNullable();
  table.text('state');
}).then(() => knex('state').insert([
  { state: 'Activo' },
  { state: 'Inactivo' },
  { state: 'Vendido' },
]));

exports.down = (knex) => knex.schema.dropTable('state');
