import { type FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { confirmacionSchema, invitadoSchema } from '../../../model/invitadoModel.ts';

const invitacionRoutes: FastifyPluginAsyncTypebox = async(server) => {
    server.get('', {
        schema: {
            summary: "Obtener invitacion por codigo",
            tags: ["Invitacion"],
            params: Type.Pick(invitadoSchema, ["codigo"]),
            response: {
                200: invitadoSchema,
            },
        },
    },
    async (req, rep) => {
        return await server.InvDB.getByCode(req.params.codigo);
    }
);
    server.patch('', {
        schema: {
            summary: "Modificar invitacion por codigo",
            tags: ["Invitacion"],
            params: Type.Pick(invitadoSchema, ['codigo']),
            body: confirmacionSchema,
            response: {
                200: invitadoSchema
            }
        }
    },
    async(req, rep) => {
        return await server.InvDB.confirmByCode(req.params.codigo, req.body);
    }
);
}

export default invitacionRoutes;