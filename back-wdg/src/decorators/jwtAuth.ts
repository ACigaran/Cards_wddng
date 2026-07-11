import fastifyPlugin from "fastify-plugin";
import type { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from '@fastify/jwt';

export default fastifyPlugin(async function (fastify) {
    fastify.decorate("authenticate",
        async (req: FastifyRequest, rep: FastifyReply) => {
            await req.jwtVerify()
        }
    );
});

declare module "fastify" {
    interface FastifyInstance {
        authenticate(req: FastifyRequest, rep: FastifyReply): void;
    }
}