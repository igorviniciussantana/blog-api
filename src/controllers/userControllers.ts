import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getUsers() {
  try {
    const users = await prisma.users.findMany();

    return { users };
  } catch (err) {
    return "Não foi possível retornar os posts" + err;
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
    return "Não foi possível encontrar o post" + err;
  }
}

// export async function createUser(
//   request: FastifyRequest<{
//     Params: {
//       id: string;
//     };
//   }>,
//   reply: FastifyReply
// ) {
//   const createUserBody = z.object({
//     name: z.string(),
//     username: z.string(),
//     banner_url: z.string(),
//   });

//   try {
//     const { name, username, banner_url } = createUserBody.parse(request.body);
//     await prisma.post.create({ data: { title, content, banner_url } });
//     return reply.status(201).send(`Post ${title} foi cadastrado com sucesso`);
//   } catch (err) {
//     return reply.status(400).send("Não foi possível cadastrar o post" + err);
//   }
// }

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

  try{
  await prisma.post.delete({ where: { id: request.params.id } });

  return reply.status(201).send("Post deletado com sucesso!");
}catch(err){
  return reply.status(400).send("Não foi possível deletar o post" + err);

}
}
