const Deal = require('../../db/models/deal');
const { validDealBody } = require('../helpers/deals/validDealBody')

const createDeal = async (req, res, next) => {
  //TODO: refactor this
  try {
    const bodyCheck = validDealBody(req.body);
    if (bodyCheck.length) throw new Error(`missing property: ${bodyCheck}`);
    const deal = await Deal.query().insert(req.body);
    res.status(201).send(deal)
  } catch(err) {
    res.status(400).send({ error: err.message })
  }
}

module.exports = {
  createDeal
}