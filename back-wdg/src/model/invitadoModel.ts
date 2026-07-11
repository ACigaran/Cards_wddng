import { type Static ,Type } from '@fastify/type-provider-typebox';

export const invitadoSchema = Type.Object({
id_invitado: Type.Integer({minimum: 1}),
nombre: Type.String(),
ciudad: Type.Optional(Type.String()),
estado: Type.Enum({
    pendiente: 'pendiente',
    confirmado: 'confirmado',
    rechazado: 'rechazado',
}),
cant_personas: Type.Integer({minimum: 1}),
detalle: Type.Optional(Type.String()),
fecha_confirmacion: Type.Optional(Type.String()),
fecha_creacion: Type.String()
})

export const invitadoQuerySchema = Type.Optional(
    Type.Object({
        nombre: Type.Optional(Type.String({maxLength: 50})),
        ciudad: Type.Optional(Type.String())
}))

export type Invitado = Static<typeof invitadoSchema>
export type InvitadoQuery = Static<typeof invitadoQuerySchema>