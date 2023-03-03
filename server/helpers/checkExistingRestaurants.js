const Restaurant = require('../../db/models/restaurant');
const { raw } = require('objection');

const checkExistingRestaurants = async (body) =>{
   return await Restaurant.query()
    .where('name', body.name)
    .where('neighborhood', body.neighborhood)
}

module.exports = { checkExistingRestaurants }
