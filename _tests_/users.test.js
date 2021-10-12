const { Users } = require("../src/models");

const supertest = require("supertest");

const app = require("../src/app");

const request = supertest(app);

beforeAll(async () => {
    await Users.create({
        first_name: "JJ",
        last_name: "DD",
        password: "jjdd123",
        email: "jjdd@gmail.com"
    });
});

describe("Get User", () => {
    it("To get all User is not posible for users", async () => {
        const response = await request.get("/api/v1/users/");

        expect(response.status).toBe(200);
        expect(response.body.mensaje).toBe("Token no proporcionado.");
    });
});

describe("Create User", () => {
    it("To post a new user", async () => {
        user = {
            first_name: "JJ",
        last_name: "DD",
        password: "jjdd123",
        email: "jjhdd@gmail.com"
        };
        const response = await request
            .post("/api/v1/users/").send(user)

        expect(response.status).toBe(201);
    });
});