import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { encrypt } from "../services/crypto";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();

    return { users };
  } catch (err) {
    return "Não foi possível retornar os usuários" + err;
  }
}

export async function getSingleUser(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const userReturn = await prisma.user.findUnique({
      where: { id: request.params.id },
    });

    return { userReturn };
  } catch (err) {
    return "Não foi possível encontrar o usuário" + err;
  }
}

export async function createUser(
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply
) {
  const createUserBody = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    avatarUrl: z.string(),
    description: z.string(),
    password: z.string(),
  });

  try {
    const { name, username, email, avatarUrl, description, password } =
      createUserBody.parse(request.body);
    const encryptedPassword = encrypt(password);

    await prisma.user.create({ data: { email, name, password: encryptedPassword, username, avatarUrl, description  } });
    return reply.status(201).send(`Usuário ${name} foi cadastrado com sucesso`);
  } catch (err) {
    return reply.status(400).send("Não foi possível cadastrar o post" + err);
  }
}

export async function updateUser(
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
    await prisma.post.update({
      where: { id: request.params.id },
      data: { title, content, banner_url },
    });

    return reply.status(201).send(`Post ${title} foi atualizado com sucesso`);
  } catch (err) {
    return reply.status(400).send("Não foi possível atualizar o post" + err);
  }
}

export async function deleteUser(
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
