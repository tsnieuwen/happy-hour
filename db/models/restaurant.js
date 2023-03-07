const { Model } = require('objection');
const Deal = require('./deal');

class Restaurant extends Model {
  static get tableName() {
    return 'restaurant';
  }

  static get relationalMappings() {
    return {
      deal: {
        relation: Model.HasManyRelation,
        modelClass: Deal,
        join: {
          from: "restaurant.id",
          to: "deal.restaurant_id"
        }
      }
    }
  }

}

module.exports = Restaurant;