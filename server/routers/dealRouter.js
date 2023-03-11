const express = require('express');
const router = new express.Router();
const { createDeal } = require('../controllers/dealController');

router.post('/restaurants/:id/deals', createDeal);

module.exports = router; 