import fastify from 'fastify';
import autoLoad from '@fastify/autoload';
import cors from '@fastify/cors'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const server = fastify({logger:true}).withTypeProvider<TypeBoxTypeProvider>();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const origin = process.env.FRONT_URL;
await server.register(cors, {
    origin: origin,
    methods: ["GET", "POST","PATCH", "PUT", "DELETE"]
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
const puerto_back = process.env.BACK_PORT || 6200;
try{
    await server.listen({ port: puerto_back, host: '::'});
    console.log(`Backend en linea - http://localhost:${puerto_back}`);
}catch(err){
    server.log.error(err);
    process.exit(1);
}