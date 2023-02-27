import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { FastifyRequest } from "fastify";
import {
  createPost,
  getPosts,
  getSinglePost,
} from "../controllers/postControllers";

export async function postRoutes(fastify: FastifyInstance) {
  fastify.get("/posts", getPosts);

  fastify.post("/posts", createPost);

  fastify.get("/posts/:id", getSinglePost);

  fastify.put(
    "/posts/:id",
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      reply
    ) => {
      const createPostBody = z.object({
        title: z.string(),
        content: z.string(),
        banner_url: z.string(),
      });

      const { title, content, banner_url } = createPostBody.parse(request.body);
      await prisma.post.update({
        where: { id: request.params.id },
        data: { title, content, banner_url },
      });

      return reply.status(201).send(`Post ${title} foi atualizado com sucesso`);
    }
  );

  fastify.delete(
    "/posts/:id",
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      reply
    ) => {
      await prisma.post.delete({ where: { id: request.params.id } });

      return reply.status(201).send("Post deletado com sucesso!");
    }
  );
}
