import { ListRecarga, recargarTienda } from "../controller/recargar.controller"
import { deleteRoles, ListRoles, SaveRoles, updateRoles } from "../controller/roles.controller"
import { ValidacionBasic } from "../function/ValidacionBasic"




const routes = [
    {
        path: '/api/recargar/:tienda_id',
        method: 'GET',
        schema: {
            summary: 'list creditos recargas',
            params: {
                type: 'object',
                required: ['tienda_id'],
                properties: {
                    tienda_id: {type: 'number', description: 'tienda_id'},
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: ListRecarga
    },
    {
        path: '/api/recargar',
        method: 'POST',
        schema: {
            summary: 'recargar store',
            body: {
                type: 'object',
                required: ['accounts_id','tienda_id','saldo','transacion','forma_pago','banco'],
                properties: {
                    accounts_id: { type: 'number', description: 'accounts_id', minLength: 1 },  
                    tienda_id: { type: 'number', description: 'tienda_id', minLength: 1 },  
                    saldo: { type: 'number', description: 'saldo', minLength: 1 },  
                    transacion: { type: 'string', description: 'transacion' },  
                    forma_pago: { type: 'string', description: 'forma_pago' },  
                    banco: { type: 'string', description: 'banco' },  
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: recargarTienda
    },
    {
        path: '/api/recargar/:id',
        method: 'PUT',
        schema: {
            summary: 'update role',
            params: { 
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number', description: 'id' },
                }
            },
            body: {
                type: 'object',
                required: ['username', 'password', 'role'],
                properties: {
                    role: { type: 'string', description: 'role' },  
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: updateRoles
    },
    {
        path: '/api/recargar/:id',
        method: 'DELETE',
        schema: {
            summary: 'delete role',
            params: { 
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number', description: 'id' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: deleteRoles
    }
]
export default routes