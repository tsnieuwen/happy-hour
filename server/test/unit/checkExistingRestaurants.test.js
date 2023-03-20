const { checkExistingRestaurants } = require('../../helpers/restaurants/checkExistingRestaurants');
const { setupDb, disconnectDb } = require('../../../db/dbSetup');
const Restaurant = require('../../../db/models/restaurant')


describe('checkExistingRestaurant tests', () => {

  beforeAll(() => {
    setupDb();
  });

  afterAll(async () => {
    await Restaurant.query().delete();
    disconnectDb();
  });

  it('should catch a if a restaurant with the same name and neighborhood exists in db', async () => {
    const body = {
      name: "Machete",
      has_patio: false,
      cuisine: "mexican",
      neighborhood: "LoDo",
      lat: 12.2,
      long: 68.5
    };
    const result = await checkExistingRestaurants(body);
    expect(result.length).toEqual(1);
  })

  it('should allow same name but different neighborhood', async () => {
    const body = {
      name: "Machete",
      has_patio: false,
      cuisine: "mexican",
      neighborhood: "LoHi",
      lat: 12.2,
      long: 68.5
    };
    const result = await checkExistingRestaurants(body);
    expect(result.length).toEqual(0);
  })

  it('should allow same neighborhood but different name', async () => {
    const body = {
      name: "Terminal Bar",
      has_patio: false,
      cuisine: "mexican",
      neighborhood: "LoDo",
      lat: 12.2,
      long: 68.5
    };
    const result = await checkExistingRestaurants(body);
    expect(result.length).toEqual(0);
  })
})