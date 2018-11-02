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

let jwtToken;

async function loginAsTom(password) {
  let email = fixtures.users.tom.email;
  let response = await request(app)
    .post("/users/login")
    .send({ email, password });

  expect(response.statusCode).toBe(status.OK);
  jwtToken = response.body.user.token;
}

test("Change password on the current user", async () => {
  await loginAsTom(fixtures.users.tom.password);

  const newPassword = "new-password";
  const updatedUser = {
    password: newPassword
  };

  let response = await request(app)
    .put("/users/change_password")
    .set("Authorization", "Bearer " + jwtToken)
    .send({ user: updatedUser });

  expect(response.statusCode).toBe(status.OK);

  await loginAsTom(newPassword);
});