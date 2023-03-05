import { FastifyInstance } from "fastify";
import { createCategory, getCategories, getCategory } from "../controllers/categoryControllers";
import { authenticate } from "../plugins/authenticate";

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.get("/categories", getCategories);

  fastify.get("/categories/:name", getCategory);

  fastify.post("/categories", createCategory)
}
