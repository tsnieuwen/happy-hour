const supertest = require("supertest");
const app = require("../../app");
const { disconnectDb } = require("../../../db/dbSetup");
const Restaurant = require("../../../db/models/restaurant");

describe("/restaurants", () => {
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
        expect(res.body.length).toBeGreaterThan(0);
      })
    })

    describe('sad paths', () => {

    })
  })
});
