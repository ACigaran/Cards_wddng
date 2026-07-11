import { type Static ,Type } from '@fastify/type-provider-typebox';

export const usuarioSchema = Type.Object({
    id_usuario: Type.Integer({minimum: 1}),
    username: Type.String({maxLength: 15}),
})

export const credencialesSchema = Type.Object({
username: Type.String({maxLength: 15 ,default: 'admin'}),
password: Type.String({minLength:2, default: 'boda'})
})


export type Credencial = Static<typeof credencialesSchema>
export type Usuario = Static<typeof usuarioSchema>