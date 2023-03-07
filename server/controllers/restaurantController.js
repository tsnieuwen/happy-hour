const Restaurant = require('../../db/models/restaurant');
const { checkExistingRestaurants } = require('../helpers/checkExistingRestaurants');
const { validCreateBody } = require('../helpers/validCreateBody');


const createRestaurant = async (req, res, next) => {
  try {
    const bodyCheck = validCreateBody(req.body);
    if (bodyCheck.length) throw new Error(`missing property: ${bodyCheck}`);
    const existingRestaurants = await checkExistingRestaurants(req.body)
    if (existingRestaurants.length > 0) throw new Error('Restaurant already in database');
    const restaurant = await Restaurant.query().insert(req.body);
    res.status(201).send(restaurant)
  } catch(err) {
    res.status(400).send({ error: err.message })
  }
}

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.query();
    res.status(200).send(restaurants);
  } catch(err) {
    res.status(500).send({error: err.message} )
  }
}

const getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.query().findById(req.params.id);
    if (!restaurant) throw new Error('Restaurant not found');
    res.status(200).send(restaurant);
  } catch(err) {
    res.status(404).send({ error: err.message })
  }
}

// const updateRestaurant = async (req, res, next) => {
//   try{
//     if (!checkUpdateParams(Object.keys(req.body))) throw new Error('Invalid update property provided');
//     if (!Object.keys(req.body).length) throw new Error('Please provide valid update');
//     const restaurant = await Restaurant.query().findById(req.params.id).patch(req.body);
//     res.status(200).send({status: 'Success'});
//   } catch(err) {
//     res.status(400).send({ Err: err.message} )
//   }
// }

// const deleteRestaurant = async (req, res, next) => {

// }

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
//   updateRestaurant,
//   deleteRestaurant
}