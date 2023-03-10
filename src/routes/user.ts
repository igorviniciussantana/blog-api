import { FastifyInstance } from "fastify";
import {
  createUser,
  deleteUser,
  getUsers,
  getSingleUser,
  updateUser,
  getUserPosts,
  favoritePost,
  getFavoritesPosts,
  removeFavorite,
} from "../controllers/userControllers";
import { authenticate } from "../plugins/authenticate";


export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/users", getUsers);

  fastify.post("/users", createUser);

  fastify.get("/users/:id", getSingleUser);

  fastify.get("/users/:userId/favorites", getFavoritesPosts);

  fastify.get("/users/posts/:userId", getUserPosts)

  fastify.post("/users/:postId/favorite", {
    onRequest: [authenticate]
  }, favoritePost)

  fastify.post("/users/:postId/favorite/remove", {
    onRequest: [authenticate]
  }, removeFavorite)

  fastify.put("/users/:id", updateUser);

  fastify.delete("/users/:id", deleteUser);
}
