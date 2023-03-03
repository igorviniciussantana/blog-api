import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";
import { decrypt } from "../services/crypto";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/me",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      const user = await prisma.user.findUnique({
        where: {
          id: request.user.sub,
        },
      });

      return { user };
    }
  );

  fastify.post("/signin", async (request, reply) => {
    const createUserBody = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createUserBody.parse(request.body);

    let user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return reply.status(404).send({
        message: "Usuário não encontrado.",
      });
    }

    if (decrypt(user.password) === password) {
      const token = fastify.jwt.sign(
        {
          name: user.name,
          username: user.username,
        },
        {
          sub: user.id,
          expiresIn: "7 days",
        }
      );

      return { token };
    }

    return reply.status(400).send({
      message: "Senha incorreta.",
    });
  });
}
