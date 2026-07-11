import fastifyPlugin from "fastify-plugin";
import { UsuarioDB } from "../services/usuario_db_service.ts";
import { myPool } from "../services/db_services.ts"

export default fastifyPlugin(async function (fastify) {
    fastify.decorate("UserDB", new UsuarioDB(myPool))
})

declare module 'fastify'{
    interface FastifyInstance {
        UserDB: UsuarioDB
    }
}