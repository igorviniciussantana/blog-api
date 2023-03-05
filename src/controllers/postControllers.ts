import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany();

    return { posts };
  } catch (err) {
    return "Não foi possível retornar os posts" + err;
  }
}

export async function getSinglePost(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const postReturn = await prisma.post.findUnique({
      where: { id: request.params.id },
    });

    return { postReturn };
  } catch (err) {
    return "Não foi possível encontrar o post" + err;
  }
}

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  const createPostBody = z.object({
    title: z.string(),
    content: z.string(),
    banner_url: z.string(),
    categoryId: z.string(),
  });

  try {
    const { title, content, banner_url, categoryId } = createPostBody.parse(
      request.body
    );
    await prisma.post.create({
      data: {
        title,
        content,
        banner_url,
        userId: request.user.sub,
        categoryId,
      },
    });
    return reply.status(201).send(`Post ${title} foi cadastrado com sucesso`);
  } catch (err) {
    return reply.status(400).send("Não foi possível cadastrar o post" + err);
  }
}

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
  const createPostBody = z.object({
    title: z.string(),
    content: z.string(),
    banner_url: z.string(),
  });

  const createPostParams = z.object({
    id: z.string(),
  });

  const { id } = createPostParams.parse(request.params);

  try {
    const { title, content, banner_url } = createPostBody.parse(request.body);

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (post?.userId == request.user.sub) {
      await prisma.post.update({
        where: { id },
        data: { title, content, banner_url },
      });
      return reply.status(201).send(`Post ${title} foi atualizado com sucesso`);
    }

    return reply
      .status(400)
      .send("Você não tem autorização para atualizar esse post");
  } catch (err) {
    return reply.status(400).send("Não foi possível atualizar o post" + err);
  }
}

export async function deletePost(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    await prisma.post.delete({ where: { id: request.params.id } });

    return reply.status(201).send("Post deletado com sucesso!");
  } catch (err) {
    return reply.status(400).send("Não foi possível deletar o post" + err);
  }
}
