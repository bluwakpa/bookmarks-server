const app = require("../src/app");
const uuid = require("uuid/v4");

describe("Unauthorized requests", () => {
  it("should return 401 when api token missing or incorrect", () => {
    return supertest(app)
      .get("/api/bookmarks")
      .expect(401);
  });
});

describe("Requests to /api/bookmarks endpoints", () => {
  it("GET request responds with array of bookmarks", () => {
    return supertest(app)
      .get("/api/bookmarks")
      .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an("array");
      });
  });

  it("POST returns 201 when valid data sent", () => {
    return supertest(app)
      .post("/api/bookmarks")
      .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
      .send({
        title: "sample",
        url: "https://sample.com",
        description: "sample",
        rating: 5
      })
      .expect(201);
  });
});

describe("GET /api/bookmarks/:id", () => {
  it("returns 404 not found if ID is not valid for bookmark GET", () => {
    return supertest(app)
      .get("/api/bookmarks/no-bookmark")
      .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
      .expect(404);
  });
});