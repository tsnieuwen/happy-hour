const { validDealBody } = require('../../helpers/deals/validDealBody');

describe('validDealBody tests', () => {

  it('should catch missing property', () => {
    const body = {
      item: "beer",
      percent_off: 0.34,
      description: "This is a deal on beer",
      start_time: 900,
      end_time: 1200,
      weekday: "Monday",
      category: "drink",
      restaurant_id: 1
    };
    const missingProperties = validDealBody(body);
    expect(missingProperties[0]).toEqual('price');
  })

  it('should catch multiple missing property', () => {
    const body = {
      item: "beer",
      description: "This is a deal on beer",
      start_time: 900,
      end_time: 1200,
      weekday: "Monday",
      category: "drink",
      restaurant_id: 1
    };
    const missingProperties = validDealBody(body);
    expect(missingProperties[0]).toEqual('price');
    expect(missingProperties[1]).toEqual('percent_off');
  })

  it('should return empty array if no properties missing', () => {
    const body = {
      item: "beer",
      price: 34.89,
      percent_off: 12.56,
      description: "This is a deal on beer",
      start_time: 900,
      end_time: 1200,
      weekday: "Monday",
      category: "drink",
      restaurant_id: 1
    };
    const missingProperties = validDealBody(body);
    expect(missingProperties.length).toEqual(0);
  })
})