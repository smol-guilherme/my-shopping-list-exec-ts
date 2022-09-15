import { prisma } from "../src/database";
import { items } from "@prisma/client";
import { TItemId } from "../src/types/ItemsTypes";
import { newItem } from "./factories/itemFactory";
import app from "../src/app";
import supertest from "supertest";

beforeAll(async () => {
  await prisma.$queryRaw`TRUNCATE TABLE items;`;
});
const itemId: TItemId = { id: null };

describe("Testa POST /items ", () => {
  it("Deve retornar 201, se cadastrado um item no formato correto", async () => {
    const body = newItem();
    const response = await supertest(app).post("/items").send(body);
    itemId.id = response.body.id;
    expect(response.status).toBe(201);
  });
  it("Deve retornar 409, ao tentar cadastrar um item que exista", async () => {
    const body = newItem();
    const { status } = await supertest(app).post("/items").send(body);

    expect(status).toBe(409);
  });
});

describe("Testa GET /items ", () => {
  it("Deve retornar status 200 e o body no formato de Array", async () => {
    const response = await supertest(app).get("/items");

    expect(response.status).toBe(200);
    expect(response.body instanceof Array).toBe(true);
  });
});

describe("Testa GET /items/:id ", () => {
  it("Deve retornar status 200 e um objeto igual a o item cadastrado", async () => {
    const { status } = await supertest(app).get(`/items/${itemId.id}`);

    expect(status).toBe(200);
  });
  it("Deve retornar status 404 caso não exista um item com esse id", async () => {
    const { status } = await supertest(app).get(
      `/items/${Math.floor(itemId.id + Math.random() * 1000)}`
    );

    expect(status).toBe(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
