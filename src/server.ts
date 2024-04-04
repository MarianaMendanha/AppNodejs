import fastify from "fastify";
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const app = fastify()

// conexao com banco de dados
const prisma = new PrismaClient({
    log: ['query'],
})

// // Rota da home
// app.get('/', () => {
//     return 'Hellou da Mari'
// })

// app.get('/teste', () => {
//     return 'Teste'
// })

app.post('/events', async (request, reply) => {
    console.log(request.body)
    const createEventSchema = z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        slug: z.string(),
        maximumAttendees: z.number().int().positive().nullable(),
    })

    // validação com o molde usando o parse
    const data = createEventSchema.parse(request.body)

    const event = await prisma.event.create({
        data: {
            title: data.title,
            details: data.details,
            slug: data.slug,
            maximumAttendees: data.maximumAttendees
        },
    })

    // return { eventId : event.id }
    return reply.status(201).send({ eventId : event.id })
})

// Servidor na porta 3333
app.listen({port: 3333}).then(() => {
    console.log('HTTP server Running!')
})