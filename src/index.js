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
import Transaciones from './routes/transaciones.routes'
import PreRegistro from './routes/preregistro.routes'

import './database/conexion'
import moment from 'moment'
import { conexion } from './database/conexion'
moment.locale('es');

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

    Transaciones.forEach(route => {
        fastify.route(route)
    });

    PreRegistro.forEach(route => {
        fastify.route(route)
    })

})


const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT, host: process.env.HOST || '' })
        await fastify.swagger();
        console.log(`server listening on ${process.env.PORT}`);
        let fecha_registro = moment().format("YYYY-MM-DD HH:mm:ss");
        console.log(fecha_registro);
        console.log("\n");
        let conex = await conexion.query('SELECT NOW()')
        console.log(conex[0][0]['NOW()']);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start()