import Fastify from "fastify";
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query'],
})

async function bootstrap() {
  const fastify = Fastify({ logger: true });


fastify.get('/posts',  async() => {
    const posts = await prisma.post.findMany()

    return {posts}
})

fastify.post('/posts', async() => {
})

  await fastify.listen({port: 3333})
}

bootstrap();
