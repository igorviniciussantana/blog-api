import { FastifyInstance } from "fastify";
import {
  createPost,
  deletePost,
  getPosts,
  getSinglePost,
  updatePost,
} from "../controllers/postControllers";
import { authenticate } from "../plugins/authenticate";

export async function postRoutes(fastify: FastifyInstance) {
  fastify.get("/posts", getPosts);

  fastify.post("/posts", {
    onRequest: [authenticate]
  }, createPost);

  fastify.get("/posts/:id",  getSinglePost);


  fastify.put("/posts/:id",{
    onRequest: [authenticate]
  }, updatePost);

  fastify.delete("/posts/:id", deletePost);
}
