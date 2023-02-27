import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { FastifyRequest } from "fastify";


export async function postRoutes(fastify: FastifyInstance){

    fastify.get("/posts", async () => {
        const posts = await prisma.post.findMany();
    
        return { posts };
      });
    
      fastify.post("/posts", async (request, reply) => {
        const createPostBody = z.object({
          title: z.string(),
          content: z.string(),
          banner_url: z.string(),
        });
    
        try {
          const { title, content, banner_url } = createPostBody.parse(request.body);
          await prisma.post.create({ data: { title, content, banner_url } });
          return reply.status(201).send(`Post ${title} foi cadastrado com sucesso`);
        } catch (err) {
          return reply.status(500).send("Não foi possível cadastrar o post" + err);
        }
      });
    
      fastify.get(
        "/posts/:id",
        async (
          request: FastifyRequest<{
            Params: {
              id: string;
            };
          }>,
          reply
        ) => {
          const postReturn = await prisma.post.findUnique({
            where: { id: request.params.id },
          });
    
          return { postReturn };
        }
      );
    
      fastify.put(
        "/posts/:id",
        async (
          request: FastifyRequest<{
            Params: {
              id: string;
            };
          }>,
          reply
        ) => {
          const createPostBody = z.object({
            title: z.string(),
            content: z.string(),
            banner_url: z.string(),
          });
    
          const { title, content, banner_url } = createPostBody.parse(request.body);
          await prisma.post.update({
            where: { id: request.params.id },
            data: { title, content, banner_url },
          });
    
          return reply.status(201).send(`Post ${title} foi atualizado com sucesso`);
        }
      );
    
    fastify.delete("/posts/:id", async ( request: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    reply) => {
    
      await prisma.post.delete({where: { id: request.params.id}})
    
      return reply.status(201).send('Post deletado com sucesso!');
    })


}