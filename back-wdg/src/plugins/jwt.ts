import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import type { FastifyPluginAsync } from "fastify";


const jwtPlugin: FastifyPluginAsync = fp(async (fastify) => {
    const secret = process.env.FASTIFY_SECRET || 'SECRRETO';
    if (!secret) throw new Error("Falta setear el secret.");
    await fastify.register(jwt, {secret});
});

export default jwtPlugin;