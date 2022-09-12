import { DeleteTiendas, ListarHistorialTienda, ListarSaldosTienda, ListarTransaccionesTienda, ListarTransacionesUltimas, ListTiendas, ListTiendasCedula, SaveTiendas, TotalesCard, UpadteTransacionTicket, UpdateTiendas, UpdateTiendasPassword, ValidarExistenciaTienda } from "../controller/tienderos.controller";
import { ValidacionBasic } from "../function/ValidacionBasic";

const routes = [
    {
        path: '/api/tiendas/:id',
        method: 'GET',
        schema: {
            summary: 'list tiendas',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: 'id' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: ListTiendas
    },
    {
        path: '/api/tienda_cedula',
        method: 'POST',
        schema: {
            summary: 'list tiendas cedula',
            body: {
                type: 'object',
                required: ['cedula'],
                properties: {
                    cedula: { type: 'string', description: 'cedula', minLength: 10, maxLength: 13 },
                }
            }

        },
        onRequest: ValidacionBasic,
        handler: ListTiendasCedula
    },
    {
        path: '/api/tiendas',
        method: 'POST',
        schema: {
            summary: 'create tiendas',
            body: {
                type: 'object',
                required: ['account_id','nombre_tienda','responsable','cedula','token_sistema','password','usuario'],
                properties: {
                    account_id: { type: 'number',description: 'account_id'},
                    nombre_tienda: { type: 'string', description: 'nombre_tienda' },
                    responsable: { type: 'string', description: 'responsable' },
                    cedula: { type: 'string', description: 'cedula' },
                    comision: { type: 'number', description: 'comision' },
                    token_sistema: { type: 'string', description: 'token_sistema' },
                    password: { type: 'string', description: 'password' },
                    direccion: { type: 'string', description: 'direccion' },
                    usuario: { type: 'string', description: 'usuario' },
                    telefono: { type: 'string', description: 'telefono' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: SaveTiendas
    },
    {
        path: '/api/tiendas/:id',
        method: 'PUT',
        schema: {
            summary: 'cambiar password',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number',description: 'id'},
                }
            },
            body: {
                type: 'object',
                required: ['password'],
                properties: {
                    password: { type: 'string', description: 'password' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: UpdateTiendasPassword
    },
    {
        path: '/api/tiendas',
        method: 'PUT',
        onRequest: ValidacionBasic,
        handler: UpdateTiendas
    },
    {
        path: '/api/tiendas/:id',
        method: 'DELETE',
        schema: {
            summary: 'delete tiendas',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number',description: 'id'},
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: DeleteTiendas

    },
    {
        path: '/api/transacciones/:id',
        method: 'GET',
        schema: {
            summary: 'list transacciones tiendas',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: 'id' },
                }
            }

        },
        onRequest: ValidacionBasic,
        handler: ListarTransaccionesTienda
    },
    {
        path: '/api/historialcredito/:id',
        method: 'GET',
        schema: {
            summary: 'list historialcredito tiendas',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: 'id' },
                }
            }

        },
        onRequest: ValidacionBasic,
        handler: ListarHistorialTienda
    },
    {
        path: '/api/saldotiendas/:id',
        method: 'GET',
        schema: {
            summary: 'list saldotiendas tiendas',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: 'id' },
                }
            }

        },
        onRequest: ValidacionBasic,
        handler: ListarSaldosTienda
    },
    {
        path: '/api/totalcard/:id',
        method: 'GET',
        schema: {
            summary: 'list totalcard tiendas',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: 'id' },
                }
            }

        },
        onRequest: ValidacionBasic,
        handler: TotalesCard
    },
    {
        path: '/api/ultimastransaciones/:id',
        method: 'GET',
        schema: {
            summary: 'list ultimastransaciones tiendas',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: 'id' },
                }
            }

        },
        onRequest: ValidacionBasic,
        handler: ListarTransacionesUltimas
    },
    {
        path: '/api/ticket',
        method: 'PUT',
        schema: {
            summary: 'list ticket',
            body: {
                type: 'object',
                properties: {
                    ticket: { type: 'string', description: 'ticket' },
                    numero_control: { type: 'string', description: 'numero_control' },
                }
            }

        },
        onRequest: ValidacionBasic,
        handler: UpadteTransacionTicket
    },
    {
        path: '/api/validarTienda',
        method: 'PUT',
        onRequest: ValidacionBasic,
        handler: ValidarExistenciaTienda
    },
]

export default routes;