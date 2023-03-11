const Deal = require('../../db/models/deal');
const validCreateBody = require('../helpers/deals/validCreateBody');

const createDeal = async (req, res, next) => {
  //TODO: refactor this
  try {
    const bodyCheck = validCreateBody(req.body);
    if (bodyCheck.length) throw new Error(`missing property: ${bodyCheck}`);
    const existingDeals = await checkExistingRestaurants(req.body)
    if (existingDeals.length > 0) throw new Error('Deal already in database');
    const deal = await Deal.query().insert(req.body);
    res.status(201).send(deal)
  } catch(err) {
    res.status(400).send({ error: err.message })
  }
}

module.exports = {
  createDeal
}