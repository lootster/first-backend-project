process.env.NODE_ENV = "integration";

const testDB = require("../test_helper/in_memory_mongodb_setup");
const fixtureLoader = require("../test_helper/fixtures");
const fixtures = require("../test_helper/fixtures").fixtures;
const request = require("supertest");
const app = require("../app");
const status = require("http-status");

beforeAll(testDB.setup);
beforeAll(fixtureLoader.load);
afterAll(testDB.teardown);

describe("User authentication", () => {
  test("User login successfully", async () => {
    let email = fixtures.users.tom.email;
    let password = fixtures.users.tom.password;
    let response = await request(app)
      .post("/users/login")
      .send({ email, password });

    let userJson = response.body.user;
    expect(response.statusCode).toBe(status.OK);
    expect(userJson).toBeDefined();
    expect(userJson.email).toEqual(email);
    expect(userJson.token).toBeDefined();
    expect(userJson.token).not.toBeNull();
  });
});

