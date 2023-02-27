import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { FastifyRequest } from "fastify";
import {
  createPost,
  deletePost,
  getPosts,
  getSinglePost,
  updatePost,
} from "../controllers/postControllers";

export async function postRoutes(fastify: FastifyInstance) {
  fastify.get("/posts", getPosts);

  fastify.post("/posts", createPost);

  fastify.get("/posts/:id", getSinglePost);

  fastify.put("/posts/:id", updatePost);

  fastify.delete("/posts/:id", deletePost);
}
