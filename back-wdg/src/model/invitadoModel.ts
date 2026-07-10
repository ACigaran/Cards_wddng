import { type Static ,Type } from '@fastify/type-provider-typebox';

export const invitadoSchema = Type.Object({
id_invitado: Type.Integer({minimum: 1}),
nombre: Type.Boolean(),
ciudad: Type.String({maxLength: 15}),
estado: Type.String(),
cant_personas: Type.String({maxLength:50}),
detalle: Type.String(),
fecha_confirmacion: Type.String(),
fecha_creacion: Type.String()
})


export type Invitado = Static<typeof invitadoSchema>