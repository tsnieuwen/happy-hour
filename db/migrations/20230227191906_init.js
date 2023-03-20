/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('restaurant', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.boolean('has_patio').notNullable();
    table.string('cuisine');
    table.string('neighborhood');
    table.float('lat').notNullable();
    table.float('long').notNullable();
    table.timestamps(true, true)
  })
  .createTable('deal', (table) => {
    table.increments();
    table.string('item').notNullable();
    table.decimal('price', 4, 2);
    table.decimal('percent_off', 3, 2);
    table.string('description');
    table.time('start_time').notNullable();
    table.time('end_time').notNullable();
    table.string('weekday').notNullable()
    table.integer('restaurant_id').references('id').inTable('restaurant').notNullable();
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('restaurant')
    .dropTableIfExists('deal')
};