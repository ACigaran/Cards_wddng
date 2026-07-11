import { BasePgRepository } from "../model/standar/baseRepository.ts";
import type { Invitado } from "../model/invitadoModel.ts";
import type { Pool } from "pg";

export class InvitadoDB extends BasePgRepository<Invitado> {

    constructor(pool: Pool){
        super(pool);
    }

    async getAll(): Promise<Invitado[]> {

        const query = `
            SELECT *
            FROM invitados
            ORDER BY nombre;
        `;

        const res = await this.pool.query<Invitado>(
            query
        );

        return res.rows;
    }

    async getById(
        id: number
    ): Promise<Invitado> {

        const query = `
            SELECT *
            FROM invitados
            WHERE id_invitado = $1;
        `;

        const res = await this.pool.query<Invitado>(
            query,
            [id]
        );

        if(res.rowCount === 0){
            throw new Error(
                "Invitado no encontrado"
            );
        }

        return res.rows[0]!;
    }

    async create(
        data: Partial<Invitado>
    ): Promise<Invitado> {

        const query = `
            INSERT INTO invitados(
                nombre,
                ciudad,
                estado,
                cant_personas,
                detalle
            )
            VALUES(
                $1,
                $2,
                COALESCE($3,'pendiente'),
                COALESCE($4,1),
                $5
            )
            RETURNING *;
        `;

        const vars = [
            data.nombre,
            data.ciudad,
            data.estado,
            data.cant_personas,
            data.detalle
        ];

        const res = await this.pool.query<Invitado>(
            query,
            vars
        );

        return res.rows[0]!;
    }

    async update(
        id: number,
        data: Partial<Invitado>
    ): Promise<Invitado> {

        const query = `
            UPDATE invitados
            SET
                nombre = $1,
                ciudad = $2,
                estado = $3,
                cant_personas = $4,
                detalle = $5
            WHERE id_invitado = $6
            RETURNING *;
        `;

        const vars = [
            data.nombre,
            data.ciudad,
            data.estado,
            data.cant_personas,
            data.detalle,
            id
        ];

        const res = await this.pool.query<Invitado>(
            query,
            vars
        );

        if(res.rowCount === 0){
            throw new Error(
                "Invitado no encontrado"
            );
        }

        return res.rows[0]!;
    }

    async delete(
        id: number
    ): Promise<void> {

        const query = `
            DELETE
            FROM invitados
            WHERE id_invitado = $1;
        `;

        const res = await this.pool.query(
            query,
            [id]
        );

        if(res.rowCount === 0){
            throw new Error(
                "Invitado no encontrado"
            );
        }
    }
}