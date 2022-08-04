import 'dotenv/config'
import Fastify from 'fastify'
import swagger from "./utils/swagger"
import Fastifycors from "@fastify/cors"

import Account from './routes/accounts.routes'
import User from './routes/user.routes'
import Roles from './routes/roles.routes'
import Tiendas from './routes/tienderos.routes'
import Recargas from './routes/recargar.routes'
import Login from './routes/login.routes'
import Config from './routes/config.routes'
import ClientPay from './routes/cliente.routes'

import './database/conexion'

const fastify = Fastify({
    logger: {
        level: 'info',
        rettyPrint: { translateTime: true }
    }
});

fastify.register(require("@fastify/swagger"), swagger.options)
fastify.register(Fastifycors, {})

fastify.register(async fastify => {

    Account.forEach(route => {
        fastify.route(route)
    });
    
    User.forEach(route => {
        fastify.route(route)
    });
    
    Roles.forEach(route => {
        fastify.route(route)
    });

    Tiendas.forEach(route => {
        fastify.route(route)
    });

    Recargas.forEach(route => {
        fastify.route(route)
    });

    Login.forEach(route => {
        fastify.route(route)
    });

    Config.forEach(route => {
        fastify.route(route)
    });

    ClientPay.forEach(route => {
        fastify.route(route)
    });

})


const start = async () => {
    try {
        if (process.env.Local) {
            await fastify.listen({ port: process.env.PORT })
        } else {
            await fastify.listen({ port: process.env.PORT, host: process.env.HOST })
        }
        await fastify.swagger();
        console.log(`server listening on ${process.env.PORT}`);

    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start()