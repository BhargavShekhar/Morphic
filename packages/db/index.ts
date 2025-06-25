import { PrismaClient } from "./generated/prisma";

declare global {
    var prismaClinet: PrismaClient | undefined
}

const prismaClient = global.prismaClinet || new PrismaClient();

if(process.env.NODE_ENV !== "production") {
    global.prismaClinet = prismaClient;
}

export default prismaClient;