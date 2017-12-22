const request = require("supertest");
const server = require("./index");

describe("Express server", () => {
  it("responds to /", () => {
    request(server)
      .get("/")
      .expect(200);
  });
});
