import { ZodTypeProvider }  from "fastify-type-provider-zod";
import { z } from 'zod';
import { generateSlug } from "../utils/generate-slug";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function createEvent(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events', {
            schema: {
                body: z.object({
                    title: z.string().min(4),
                    details: z.string().nullable(),
                    maximumAttendees: z.number().int().positive().nullable(),
                }),
                response: {
                    201: z.object({ 
                        eventId: z.string().uuid(), 
                    })
                },
            },
        }, async (request, reply) => {
            console.log(request.body)

            // const createEventSchema = z.object({
            //     title: z.string().min(4),
            //     details: z.string().nullable(),
            //     maximumAttendees: z.number().int().positive().nullable(),
            // })

            // // validação com o molde usando o parse
            // const data = createEventSchema.parse(request.body)
            const data = (request.body)

            const slug = generateSlug(data.title)

            const eventWithSameSlug = await prisma.event.findUnique({
                where:{
                    slug,
                }
            })

            if(eventWithSameSlug !== null){
                throw new Error('Já existe um evento com esse título')
            }

            const event = await prisma.event.create({
                data: {
                    title: data.title,
                    details: data.details,
                    maximumAttendees: data.maximumAttendees,
                    slug,
                },
            })

            // return { eventId : event.id }
            return reply.status(201).send({ eventId : event.id })
    })
}