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