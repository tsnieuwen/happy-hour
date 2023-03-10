const supertest = require("supertest");
const app = require("../../app");
const { disconnectDb } = require("../../../db/dbSetup");
const Restaurant = require("../../../db/models/restaurant");

describe("/restaurants", () => {
  let singleRestaurant;
  afterAll(async () => {
    await Restaurant.query().delete();
    disconnectDb();
  });

  describe("POST /restaurants", () => {
    describe("happy path", () => {
      it("Should create a restaurant when valid request body is sent", async () => {
        const body = {
          name: "Bojos",
          has_patio: true,
          cuisine: "italian/pizza",
          neighborhood: "LoDo",
          lat: 39.79,
          long: -105.08,
        };
        const res = await supertest(app)
          .post("/restaurants")
          .send(body)
          .expect(201);
        expect(res.body).toEqual({ ...body, id: res.body.id });
      });
    });

    describe("sad path", () => {
      it("Should throw error if restaurant already exists in db", async () => {
        const body = {
          name: "Machete",
          has_patio: true,
          cuisine: "italian/pizza",
          neighborhood: "LoDo",
          lat: 39.79,
          long: -105.08
        };
        const res = await supertest(app)
          .post("/restaurants")
          .send(body)
          .expect(400);
        expect(res.body.error).toEqual('Restaurant already in database');
      });

      it("Should throw error when missing properties", async () => {
        const body = {
          cuisine: "italian/pizza",
          neighborhood: "LoDo",
          lat: 39.79,
          long: -105.08,
        };
        const res = await supertest(app)
          .post("/restaurants")
          .send(body)
          .expect(400);
        expect(res.body.error).toEqual('missing property: name,has_patio');
      });
    });
  });

  describe('GET /restaurants', () =>{
    describe('happy paths', () => {
      it('Should retrieve all restaurants successfully', async () => {
        const res = await supertest(app)
          .get("/restaurants")
          .expect(200);
        singleRestaurant = res.body[0];
        expect(res.body.length).toBeGreaterThan(0);
      })
    })

    describe('sad paths', () => {

    })
  })

  describe('GET /restaurants/:id', () => {
    describe('happy paths', () => {
      it('retrieves single restaurant', async () => {
        //TODO: revisit, this test is dependent on GET /restaurants test
        const res = await supertest(app)
          .get(`/restaurants/${singleRestaurant.id}`)
          .expect(200);
        expect(res.body).toEqual(singleRestaurant);
      })
    })

    describe('sad paths', () => {
      it('throws error if bad restaurant id', async () => {
        const res = await supertest(app)
        .get('/restaurants/99999')
        .expect(404);
      expect(res.body.error).toEqual('Restaurant not found')
      })
    })
  })

  describe('PATCH /restaurants/:id', () => {
    describe('happy path', () => {
      it('can update one property', async () => {
        const updateBody = {
          lat: 100
        }
        const res = await supertest(app)
          .patch(`/restaurants/${singleRestaurant.id}`)
          .send(updateBody)
          .expect(200)
        expect(res.body.restaurant.lat).toEqual(updateBody.lat);
        expect(res.body.update).toEqual('Successful');
      })

      it('can update multiple properties', async () => {
        const updateBody = {
          lat: 100,
          name: "Asian Pepper II"
        }
        const res = await supertest(app)
          .patch(`/restaurants/${singleRestaurant.id}`)
          .send(updateBody)
          .expect(200)
        expect(res.body.restaurant.name).toEqual(updateBody.name);
        expect(res.body.restaurant.lat).toEqual(updateBody.lat);
        expect(res.body.update).toEqual('Successful');
      })
    })

    describe('sad path', () => {
      it('Throws error when updating to a existing restaurant', async () => {
        const updateBody = {
          name: "Machete",
          neighborhood: "LoDo"
        }
        const res = await supertest(app)
          .patch(`/restaurants/${singleRestaurant.id}`)
          .send(updateBody)
          .expect(400)
          
        expect(res.body.error).toEqual('Restaurant already in database');
      })
    })
  })

  describe('DELETE /restaurants/:id', () => {
    describe('happy path', () => {
      it('Deletes a restaurant successfully', async () => {
        const res = await supertest(app)
          .delete(`/restaurants/${singleRestaurant.id}`)
          .expect(200)
        
        const isDeleted = await Restaurant.query().findById(singleRestaurant.id)
        expect(isDeleted).not.toBeDefined();
      })
    })

    describe('sad path', () => {
      it('Throw error when restaurant not found', async () => {
        const res = await supertest(app)
          .delete(`/restaurants/99999`)
          .expect(400)
        
        expect(res.body.error).toEqual('Restaurant not found')
      })
    })
  })
});
