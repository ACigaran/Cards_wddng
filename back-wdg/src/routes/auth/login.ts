import fastify, { type FastifyPluginAsync } from 'fastify';
import { Type } from '@fastify/type-provider-typebox';
import jwt from "jsonwebtoken";
import { credencialesSchema } from '../../model/authModel.ts';
import type { Credencial, Usuario } from '../../model/authModel.ts';

//const { sign, verify, decode } = jwt;
//type SignOptions = jwt.SignOptions;

const loginRoutes: FastifyPluginAsync = async (fastify, opts)=>{

    fastify.post('',
        {
            schema: {
                summary: "Login",
                tags: ["Auth"],
                body: credencialesSchema,
                response: {
                    200: { token: Type.String()}
                }
            },
        },
        async (request, reply) => {
            const cuenta = await fastify.UserDB.getUserByCredentials(
                request.body as Credencial);
                if(!cuenta){
                    throw new Error("Credenciales incorrectas");
                }
            const payload: Usuario = cuenta;

            //const signOptions: SignOptions = 
            const token = fastify.jwt.sign(payload, {
                expiresIn: "8h"
            });
            return {token: token}
        });
};

export default loginRoutes;