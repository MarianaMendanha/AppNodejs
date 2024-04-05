import { ZodTypeProvider }  from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function checkIn(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .get('/attendees/:attendeeId/check-in', {
            schema: {
                params: z.object({
                    attendeeId: z.string().transform(Number), 
                }),
                response: {
                    201: z.null(),
                },
            },
        }, async (request, reply) => {
            console.log(request.body)

            const {attendeeId} = (request.params)

            const attendeeCheckIn = await prisma.checkIn.findUnique({
                where: {
                    attendeeId,
                }
            })
            if(attendeeCheckIn !== null){
                throw new Error('Participante já fez check in.')
            }


            await prisma.checkIn.create({
                data: {
                    attendeeId,
                },
            })

            return reply.status(201).send()
    })
}