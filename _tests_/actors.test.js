const { Actors } = require("../src/models");

const supertest = require("supertest");

const app = require("../src/app");

const request = supertest(app);

beforeAll(() => {
    Actors.create({
        first_name: "tom",
        last_name: "Hardy",
        dob: "1999-01-01",
        biography: "Actor de venom",
        profile_photo: "s3.amazon.com/img.png",
        active: true,
    });
});

describe("Get actors", () => {
    it("To get all actors", async () => {
        const response = await request.get("/api/v1/actors/");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    it("To get an actor", async () => {
        const response = await request.get("/api/v1/actors/1");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
    it("Failed get of a non-existent actor", async () => {
        const response = await request.get("/api/v1/actors/1000");

        expect(response.status).toBe(404);
    });
});

describe("Post Actor", () => {
    it("To post an actor", async () => {
        actor = {
            first_name: "Tom",
            last_name: "Hardy",
            dob: "1999-01-01",
            biography: "Actor",
            profile_photo: "s3.amazon.com/img.png",
            active: true,
            Movies: [],
        };
        const response = await request.post("/api/v1/actors/").send(actor);

        expect(response.status).toBe(201);
    });
    it("Failed register of a movie by empty fields", async () => {
        const actor = {
            first_name: "",
            last_name: "",
            dob: "",
            biography: "",
        };
        const response = await request.post("/api/v1/actors").send(actor);

        expect(response.status).toBe(500);
    });
});
