import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getPosts() {
  const posts = await prisma.post.findMany();

  return { posts };
}

export async function createPost(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply
) {
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
}
