import { PrismaClient, PrismaPromise } from '@prisma/client';

const prisma = new PrismaClient();

export function execute<T>(toExecute: (client: PrismaClient) => T) {
    return prisma
        .$connect()
        .then(async (_) => (await toExecute(prisma)) as unknown as T)
        .finally(async () => await prisma.$disconnect());
}
