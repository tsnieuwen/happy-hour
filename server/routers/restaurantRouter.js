const express = require('express');
const router = new express.Router();
const { getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } = require('../controllers/restaurantController');

router.get('/restaurants', getRestaurants);
router.get('/restaurants/:id', getRestaurant);
router.post('/restaurants', createRestaurant);
router.patch('/restaurants/:id', updateRestaurant);
// router.delete('/restaurants/:id', deleteRestaurant);

module.exports = router; 