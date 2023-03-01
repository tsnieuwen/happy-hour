const { Model } = require('objection ');

class Deal extends Model {
  static get tableName() {
    return 'deal';
  }
}
module.exports = Deal;