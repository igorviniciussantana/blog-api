import Fastify from "fastify";

async function bootstrap() {
  const fastify = Fastify({ logger: true });


fastify.get('/posts',  () => {
    

    return 'teste'
})

  await fastify.listen({port: 3333})
}

bootstrap();