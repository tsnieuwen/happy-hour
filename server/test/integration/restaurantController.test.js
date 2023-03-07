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
          name: "Machete",
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

    // describe("sad path", () => {
    //   it("Should throw error if restaurant already exists in db", async () => {
    //     const body = {
    //       name: "Homegrown Tap & Dough",
    //       has_patio: true,
    //       cuisine: "italian/pizza",
    //       neighborhood: "Olde Town",
    //       lat: 39.79,
    //       long: -105.08,
    //     };
    //     const res = await supertest(app)
    //       .post("/restaurants")
    //       .send(body)
    //       .expect(400);

    //     expect(res.body).toEqual({ ...body, id: res.body.id });
    //   });
    // });
  });
});
