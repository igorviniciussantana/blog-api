import Fastify from "fastify";
import cors from "@fastify/cors";
import { postRoutes } from "./routes/post";
import { userRoutes } from "./routes/user";
import jwt from '@fastify/jwt'
import { authRoutes } from "./routes/auth";

async function bootstrap() {
  const fastify = Fastify({ logger: true });

  const jwt_secret = process.env.JWT_SECRET || 'secret';
  await fastify.register(jwt, {
    secret: jwt_secret
  });

  await fastify.register(cors, {
    origin: true,
  });


  await fastify.register(postRoutes)
  await fastify.register(userRoutes)
  await fastify.register(authRoutes)


  await fastify.listen({ port: 3333 });
}

bootstrap();
