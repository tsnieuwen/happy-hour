/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.raw('TRUNCATE TABLE "restaurant" CASCADE');
  await knex.raw('TRUNCATE TABLE "deal" CASCADE');

  await knex('restaurant').insert([
    {
      name: "Asian Pepper",
      has_patio: false,
      cuisine: "chinese",
      neighborhood: "LoHi",
      lat: 40,
      long: 34
    },
    {
      name: "Machete",
      has_patio: false,
      cuisine: "mexican",
      neighborhood: "LoDo",
      lat: 12,
      long: 68
    },
    {
      name: "Fire On The Mountain",
      has_patio: true,
      cuisine: "wings",
      neighborhood: "West Highlands",
      lat: 20,
      long: 144
    },
  ])
};
