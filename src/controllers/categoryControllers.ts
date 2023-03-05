import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function getCategories(request : FastifyRequest){
const categories = await prisma.category.findMany()

return { categories }
}

export async function getCategory(request : FastifyRequest){
    const getCategoryParams = z.object({
        name : z.string()
      });
    
      const { name } = getCategoryParams.parse(request.params);
    

      const category = await prisma.category.findUnique({
        where: {
            name
        }
      })


      return { category }
}

export async function createCategory(request : FastifyRequest, reply: FastifyReply){

    const createCategoryBody = z.object({
        name: z.string()
    })

    const { name } = createCategoryBody.parse(request.body)

    await prisma.category.create({
        data : {
            name
        }
    })

    return reply.status(201).send({message : `Categoria ${name} cadastrada com sucesso`})
}