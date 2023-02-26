import Fastify from "fastify";
import cors from '@fastify/cors'
import {z} from 'zod'
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

fastify.post('/posts', async(request, reply) => {

  const createPostBody = z.object({
    title: z.string(),
    content: z.string(),
    banner_url: z.string(),
    createdAt: z.date()
  })
})

  await fastify.listen({port: 3333})
}

bootstrap();
