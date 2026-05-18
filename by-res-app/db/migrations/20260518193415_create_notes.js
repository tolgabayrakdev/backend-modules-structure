/**
 * @param {import('knex').Knex} knex
 */
export const up = (knex) =>
  knex.schema.createTable('notes', (t) => {
    t.increments('id').primary();
    t.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    t.string('title').notNullable();
    t.text('content');
    t.timestamps(true, true);
  });

export const down = (knex) => knex.schema.dropTable('notes');
