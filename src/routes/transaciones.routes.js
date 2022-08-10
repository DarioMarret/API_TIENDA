import { ListarHistorialCredito, ListarSaldosRecargas, ListarTransaccionesRecargas, ListarTransaccionesTiendas } from "../controller/transaciones.controller";
import { ValidacionBasic } from "../function/ValidacionBasic";

const routes = [
    {
        path: '/api/transaciones_admin/:id',
        method: 'GET',
        schema: {
            summary: 'list transaciones_admin',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: 'id del usuario admin' }
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: ListarTransaccionesTiendas
    },
    {
        path: '/api/listarhistorialcreditos/:id',
        method: 'GET',
        schema: {
            summary: 'list listarhistorialcreditos',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: 'id del usuario admin' }
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: ListarHistorialCredito
    },
    {
        path: '/api/saldostiendas/:id',
        method: 'GET',
        schema: {
            summary: 'list saldostiendas',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: 'id del usuario admin' }
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: ListarSaldosRecargas
    },
]

export default routes;