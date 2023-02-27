import Fastify from "fastify";
import cors from "@fastify/cors";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { FastifyRequest } from "fastify";
import { prisma } from "./lib/prisma";
import { postRoutes } from "./routes/post";
import { userRoutes } from "./routes/user";

import { bytes } from "./services/crypto";
async function bootstrap() {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, {
    origin: true,
  });

  console.log(bytes)

  await fastify.register(postRoutes)
  await fastify.register(userRoutes)

  await fastify.listen({ port: 3333 });
}

bootstrap();
