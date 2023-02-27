import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { FastifyRequest } from "fastify";

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/posts", async () => {
    const posts = await prisma.post.findMany();

    return { posts };
  });

  fastify.post("/posts", async (request, reply) => {
    const createPostBody = z.object({
      title: z.string(),
      content: z.string(),
      banner_url: z.string(),
    });

    try {
      const { title, content, banner_url } = createPostBody.parse(request.body);
      await prisma.post.create({ data: { title, content, banner_url } });
      return reply.status(201).send(`Post ${title} foi cadastrado com sucesso`);
    } catch (err) {
      return reply.status(500).send("Não foi possível cadastrar o post" + err);
    }
  });

  fastify.get(
    "/posts/:id",
    async (
      request: FastifyRequest<{
        Params: {
          id: string;
        };
      }>,
      reply
    ) => {
      const postReturn = await prisma.post.findUnique({
        where: { id: request.params.id },
      });

      return { postReturn };
    }
  );

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

  await fastify.listen({ port: 3333 });
}

bootstrap();
