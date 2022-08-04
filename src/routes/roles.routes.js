import { deleteRoles, ListRoles, SaveRoles, updateRoles } from "../controller/roles.controller"
import { ValidacionBasic } from "../function/ValidacionBasic"




const routes = [
    {
        path: '/api/roles/:id',
        method: 'GET',
        schema: {
            summary: 'list roles',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number', description: 'id' }
                }       
            }
        },
        onRequest: ValidacionBasic,
        handler: ListRoles
    },
    {
        path: '/api/roles',
        method: 'POST',
        schema: {
            summary: 'created roles',
            body: {
                type: 'object',
                required: ['role'],
                properties: {
                    role: { type: 'string', description: 'role' },  
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: SaveRoles
    },
    {
        path: '/api/roles/:id',
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
        path: '/api/roles/:id',
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