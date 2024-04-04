import { ZodTypeProvider }  from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function registerForEvent(app: FastifyInstance){
    app
        .withTypeProvider<ZodTypeProvider>()
        .post('/events/:eventId/attendees', {
            schema: {
                body: z.object({
                    name: z.string().min(4),
                    email: z.string().email(),
                }),
                params: z.object({
                    eventId: z.string().uuid(),
                }),
                response: {
                    201: z.object({ 
                        attendeeId: z.number(), 
                    })
                },
            },
        }, async (request, reply) => {
            console.log(request.body)

            const {eventId} = (request.params)
            const {name, email} = (request.body)

            const attendeeFromEmail = await prisma.attendee.findUnique({
                where: {
                    eventId_email: {
                        email,
                        eventId,
                    }
                }
            })
            if(attendeeFromEmail !== null){
                throw new Error('Participante já está cadastrado nesse evento.')
            }

            // executar em paralelo para funções não dependentes
            const [event, amountOfAttendeesForEvent] = await Promise.all([
                prisma.event.findUnique({
                    where:{
                        id: eventId,
                    }
                }),
                prisma.attendee.count({
                    where:{
                        eventId,
                    }
                })
            ])
            if(event?.maximumAttendees && amountOfAttendeesForEvent >= event.maximumAttendees){
                throw new Error('Máximo de participantes nesse evento foi atingido!.')
            }

            const attendee = await prisma.attendee.create({
                data: {
                    name,
                    email,
                    eventId,
                },
            })

            // return { eventId : event.id }
            return reply.status(201).send({ attendeeId : attendee.id })
    })
}