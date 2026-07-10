import autoLoad from '@fastify/autoload';
import fastify from 'fastify';
import cors from '@fastify/cors'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const server = fastify({logger:true}).withTypeProvider<TypeBoxTypeProvider>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const front_port = Number(process.env.API_PORT) || 3000;

const origin = `http://localhost:${front_port}`
await server.register(cors, {
    origin: origin,
    methods: ["GET", "POST", "PUT", "DELETE"]
});

await server.register(autoLoad, {
    dir: join(__dirname,'plugins')
})

await server.register(autoLoad, {
    dir: join(__dirname,'decorators')
})

await server.register(autoLoad, {
    dir: join(__dirname, 'routes'),
    routeParams: true,
})

try{
    await server.listen({ port: 3000, host: '::'});
    console.log('Backend en linea - http://localhost:3000');
}catch(err){
    server.log.error(err);
    process.exit(1);
}