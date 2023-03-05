import { FastifyInstance } from "fastify";
import {
  createUser,
  deleteUser,
  getUsers,
  getSingleUser,
  updateUser,
  getUserPosts,
} from "../controllers/userControllers";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/users", getUsers);

  fastify.post("/users", createUser);

  fastify.get("/users/:id", getSingleUser);

  fastify.get("/users/posts/:userId", getUserPosts)

  fastify.put("/users/:id", updateUser);

  fastify.delete("/users/:id", deleteUser);
}
