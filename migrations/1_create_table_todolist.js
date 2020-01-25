exports.up = async (knex) => {
  await knex.schema.createTable('todolist', (table) => {
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.string('name').notNullable();
    table.string('description').defaultTo('');
    table.boolean('finished').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('todolist');
};
