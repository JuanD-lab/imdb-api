const { Movies, Genres, Directors } = require("../src/models");
const supertest = require("supertest");
const app = require("../src/app");
const request = supertest(app);


let movie = {};

beforeAll(() => {
    const date = new Date();
    Movies.create({
        title: "venom",
        year: date,
        description: "venoms",
    });
    Genres.create({ name: "drama", active: true });
    Directors.create({
        first_name: "JJ",
        last_name: "dd",
        dob: date,
        biography: "director",
        profile_photo: "s3.amazon.com/img.png",
        active: true,
    });
});

describe("Get Movies", () => {
    it("To get all movies", async () => {
        const response = await request.get("/api/v1/movies/");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    it("Get a especific movie", async () => {
        const response = await request.get("/api/v1/movies/1");

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
    });
    it("Failed get of a non-existent actor", async () => {
        const response = await request.get("/api/v1/movies/1000");

        expect(response.status).toBe(404);
    });
});

describe("Post Movies", () => {
    it("To post a movie", async () => {
        movie = {
            title: "title",
            year: new Date(),
            description: "description",
            actors: [1],
            directors: [1],
            genres: [1],
        };
        const response = await request
            .post("/api/v1/movies/").send(movie)

        expect(response.status).toBe(201);
    });
    it("Failed register of a movie by empty fields", async() => {
        const movie = {
            title: "",
            year: "",
            description: ""
        }
        const response = await request
            .post("/api/v1/movies")
            .send(movie)

        expect(response.status).toBe(500);
    })
});
