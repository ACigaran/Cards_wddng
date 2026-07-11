import fastifyPlugin from "fastify-plugin";
import { InvitadoDB } from "../services/invitado_db_service.ts";
import { myPool } from "../services/db_services.ts"

export default fastifyPlugin(async function (fastify) {
    fastify.decorate("InvDB", new InvitadoDB(myPool))
})

declare module 'fastify'{
    interface FastifyInstance {
        InvDB: InvitadoDB
    }
}