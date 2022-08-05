import { Facturas, Pagar, ShearClient } from "../controller/cliente.controller";
import { ValidacionBasic } from "../function/ValidacionBasic";

const routes = [
    {
        path: '/api/cliente',
        method: 'POST',
        schema: {
            summary: 'shearch client store',
            body: {
                type: 'object',
                required: ['cedula'],
                properties: {
                    cedula: { type: 'string' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: ShearClient
    },
    {
        path: '/api/factura',
        method: 'POST',
        schema: {
            summary: 'select factura pay',
            body: {
                type: 'object',
                required: ['idfactura'],
                properties: {
                    idfactura: { type: 'string' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: Facturas
    },
    {
        path: '/api/pagar',
        method: 'POST',
        schema: {
            summary: 'pay factura',
            body: {
                type: 'object',
                required: ['pasarela','idtienda','total','comision','idfactura','idcliente','cedula'],
                properties: {
                    pasarela: { type: 'string' },
                    idtienda: { type: 'string' },
                    total: { type: 'string' },
                    comision: { type: 'string' },
                    idfactura: { type: 'string' },
                    idcliente: { type: 'string' },
                    cedula: { type: 'string' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: Pagar
    },
]

export default routes;