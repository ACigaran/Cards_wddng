import { Pool, type PoolConfig } from "pg";  

const pgConfig: PoolConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    max: 10,
    idleTimeoutMillis: 1000,
};

export const myPool = new Pool(pgConfig)