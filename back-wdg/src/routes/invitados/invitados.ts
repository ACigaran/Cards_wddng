import { type FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { invitadoSchema, invitadoQuerySchema } from '../../model/invitadoModel.ts';


const invitadosRoute: FastifyPluginAsyncTypebox = async(server) =>{
    server.get('', {
        schema: {
            summary: "Obtener invitados",
            tags: ["Invitados"],
            querystring: invitadoQuerySchema,
            response: {
                200: Type.Array(invitadoSchema),
            },
        },
    },
    async (req, rep) => {
        if (req.query) return await server.InvDB.findAll(req.query);
        return await server.InvDB.getAll();
    }
);
    server.post('', {
        schema: {
            summary:"Crear un invitado",
            tags: ["Invitados"],
            body: Type.Pick(invitadoSchema, ["nombre", "ciudad", "cant_personas", "detalle"]),
            response: {
                201: invitadoSchema,
            },
            security: [{ bearerAuth: [] }],
        },
        onRequest: [server.authenticate],
    },
    async (req, rep) => {
        const invitado = await server.InvDB.create(req.body);
        rep.code(201).send(invitado);
    }
);
};

export default invitadosRoute;