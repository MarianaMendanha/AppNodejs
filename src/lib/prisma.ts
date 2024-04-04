import { PrismaClient } from '@prisma/client';

// conexao com banco de dados
export const prisma = new PrismaClient({
    log: ['query'],
})