import { type FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { invitadoSchema, invitadoQuerySchema } from '../../../model/invitadoModel.ts';

const invitadosByIdRoutes: FastifyPluginAsyncTypebox = async(server) => {
    server.get('', {
        schema: {
            summary: "Obtener un invitado",
            tags: ["Invitado"],
            params: Type.Pick(invitadoSchema, ["id_invitado"]),
            response: {
                200: invitadoSchema,
            },
        },
    },
    async (req, rep) => {
        return server.InvDB.getById(req.params.id_invitado);
    }
);
    server.put('', {
        schema: {
            summary: ["Modificar invitado"],
            tags: ["Invitado"],
            params: Type.Pick(invitadoSchema, ["id_invitado"]),
            response: {
                204: Type.Null(),
            },
            security: [{ bearerAuth: [] }],
        },
        onRequest: [ server.authenticate ],
    },async (req, rep) => {
        await server.InvDB.update(req.params.id_invitado, req.body);
        rep.code(204).send();
    }
);
    server.delete('', {
        schema: {
        summary: ["Eliminar invitado"],
        tags: ["Invitado"],
        params: Type.Pick(invitadoSchema, ["id_invitado"]),
        response: {
            204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
    },
    onRequest: [ server.authenticate ],
    },
    async (req, rep) => {
        await server.InvDB.delete(req.params.id_invitado);
        rep.code(204).send();
    }
)
}

export default invitadosByIdRoutes;