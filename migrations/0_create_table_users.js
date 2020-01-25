exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('password').notNullable();
    table.boolean('is_admin').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
  await knex('users').insert({
    name: 'admin',
    password: 'admin',
    is_admin: true
  })
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
