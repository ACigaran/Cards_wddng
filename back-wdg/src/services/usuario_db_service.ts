import { BasePgRepository } from "../model/standar/baseRepository.js"
import type { Credencial, Usuario } from "../model/authModel.js";
import type { Pool } from "pg";
import fastify from "fastify";


export class UsuarioDB extends BasePgRepository<Usuario> {
  constructor(pool: Pool) {
    super(pool);
  }

  async getUserByCredentials(
    credenciales: Credencial
): Promise<Usuario> {

    const query = `
        SELECT
            id_usuario,
            username
        FROM usuarios
        WHERE username = $1
        AND password_hash = crypt(
            $2,
            password_hash
        );
    `;

    const vars = [
        credenciales.username,
        credenciales.password
    ];

    try {
        const res = await this.pool.query<Usuario>(
            query,
            vars
        );

        if(res.rowCount === 0){
            throw new Error(
                'Credenciales incorrectas'
            );
        }

        return res.rows[0]!;
    }
    catch(err){
        console.error(err);
        throw err;
    }
}
    
    async getAll(): Promise<Usuario[]> { throw new Error('No implementado') };
    
    async getById(id:number): Promise<Usuario> { throw new Error('No implementado') };

    async create(data: Partial<Credencial>): Promise<Usuario> { throw new Error('No implementado') };

    async update(id: number, data: Partial<Credencial>): Promise<Usuario> { throw new Error('No implementado') };

    async delete(id: number): Promise<void> { throw new Error('No implementado') };
}

