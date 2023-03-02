import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { encrypt } from "../services/crypto";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();

    return { users };
  } catch (err) {
    return { message: "Não foi possível retornar os usuários", error: err };
  }
}

export async function getSingleUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getSingleUserParams = z.object({
    id: z.string(),
  });

  const { id } = getSingleUserParams.parse(request.params);

  const userReturn = await prisma.user.findUnique({
    where: { id },
  });

  if (userReturn) {
    return { userReturn };
  }

  return reply.status(400).send({
    message: "Não foi possível retornar usuários",
  });
}

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createUserBody = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, username, email, password } = createUserBody.parse(
    request.body
  );

  const encryptedPassword = encrypt(password);

  const userUsername = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (userUsername) {
    return reply.status(400).send({
      message: "Esse usuário já existe.",
    });
  }

  const userEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userEmail) {
    return reply.status(400).send({
      message: "Esse email já está sendo utilizado.",
    });
  }

  await prisma.user.create({
    data: {
      email,
      name,
      username,
      password: encryptedPassword,
    },
  });

  return reply.status(201).send(`Usuário ${name} foi cadastrado com sucesso`);
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateUserParams = z.object({
    id: z.string(),
  });

  const { id } = updateUserParams.parse(request.params);

  const updateUserBody = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    description: z.string(),
    avatarUrl: z.string().url(),
  });

  const { name, username, email, password, description, avatarUrl } =
    updateUserBody.parse(request.body);

  await prisma.user.update({
    where: { id },
    data: {
      name,
      username,
      email,
      password: encrypt(password),
      description,
      avatarUrl,
    },
  });

  return reply
    .status(201)
    .send({ message: `Usuário ${name} foi atualizado com sucesso` });
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserParams = z.object({
    id: z.string(),
  });

  const { id } = deleteUserParams.parse(request.params);

  await prisma.user.delete({ where: { id } });

  return reply.status(201).send({ message: "Usuário deletado com sucesso!" });
}
