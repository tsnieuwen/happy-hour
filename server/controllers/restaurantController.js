const Restaurant = require('../../db/models/restaurant');
const { checkExistingRestaurants } = require('../helpers/restaurants/checkExistingRestaurants');
const { validRestaurantBody } = require('../helpers/restaurants/validRestaurantBody');


const createRestaurant = async (req, res, next) => {
  //TODO: refactor this
  try {
    const bodyCheck = validRestaurantBody(req.body);
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

const updateRestaurant = async (req, res, next) => {
  //TODO: refactor this
  try{
    //get restaurant being updated
    const restaurant = await Restaurant.query().findById(req.params.id);
    if (!restaurant) throw new Error('Restaurant not found');

    //update restaurant properities being updated
    if (req.body.name) restaurant.name = req.body.name;
    if (req.body.neighborhood) restaurant.neighborhood = req.body.neighborhood;

    //run checkExistingRestaurants on restaurantobject
    const existingRestaurants = await checkExistingRestaurants(restaurant)
    if (existingRestaurants[0] && existingRestaurants[0].id !== restaurant.id) throw new Error('Restaurant already in database');
    
    const updatedRestaurant = await Restaurant.query().patchAndFetchById(restaurant.id, req.body);
    res.status(200).send({ restaurant: {...updatedRestaurant}, update: 'Successful'});
  } catch(err) {
    res.status(400).send({ error: err.message} )
  }
}

const deleteRestaurant = async (req, res, next) => {
  //TODO: revisit objection delete and refactor
  try {
    const restaurant = await Restaurant.query().findById(req.params.id);
    if (!restaurant) throw new Error('Restaurant not found')
    await Restaurant.query().deleteById(req.params.id)
    res.status(200).send('Restaurant has been removed')
  } catch (err) {
    res.status(400).send( {error: err.message} )
  }
}

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
}