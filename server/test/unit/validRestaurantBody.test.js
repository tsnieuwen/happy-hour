const { validRestaurantBody } = require('../../helpers/restaurants/validRestaurantBody');

describe('validCreateBody tests', () => {

  it('should catch missing a property', () => {
    const body = {
      has_patio: false,
      cuisine: "mexican",
      neighborhood: "LoDo",
      lat: 12.2,
      long: 68.5
    };
    const missingProperties = validRestaurantBody(body);
    expect(missingProperties[0]).toEqual('name');
  })

  it('should catch multiple missing properties', () => {
    const body = {
      cuisine: "mexican",
      neighborhood: "LoDo",
      lat: 12.2,
      long: 68.5
    };
    const missingProperties = validRestaurantBody(body);
    expect(missingProperties[0]).toEqual('name');
    expect(missingProperties[1]).toEqual('has_patio');
  })

  it('should return empty array when no properties are missing', () => {
    const body = {
      name: "burger king",
      has_patio: false,
      cuisine: "mexican",
      neighborhood: "LoDo",
      lat: 12.2,
      long: 68.5
    };
    const missingProperties = validRestaurantBody(body);
    expect(missingProperties.length).toEqual(0);
  })
})