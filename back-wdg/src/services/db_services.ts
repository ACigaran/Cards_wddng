import { Pool, type PoolConfig } from "pg";  

const pgConfig: PoolConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 1000,
    max: 10,
};

export const myPool = new Pool(pgConfig)