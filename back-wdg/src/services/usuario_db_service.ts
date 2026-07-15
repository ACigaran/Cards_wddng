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
): Promise<Usuario | null> {

    if(
        credenciales.username === process.env.ADMIN_USER &&
        credenciales.password === process.env.ADMIN_PASSWORD
    ){
        return {
            id_usuario: 1,
            username: process.env.ADMIN_USER!
        };
    }

    return null;
}
    
    async getAll(): Promise<Usuario[]> { throw new Error('No implementado') };
    
    async getById(id:number): Promise<Usuario> { throw new Error('No implementado') };

    async create(data: Partial<Credencial>): Promise<Usuario> { throw new Error('No implementado') };

    async update(id: number, data: Partial<Credencial>): Promise<Usuario> { throw new Error('No implementado') };

    async delete(id: number): Promise<void> { throw new Error('No implementado') };
}

