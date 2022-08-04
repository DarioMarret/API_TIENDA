import { AsignarAccount, deleteUser, ListUsers, resetAccount, resetPassword, SaveUser, updateUser } from "../controller/user.controller"
import { ValidacionBasic } from "../function/ValidacionBasic"

const routes = [
    {
        path: '/api/usuarios_admin/:id',
        method: 'GET',
        schema: {
            summary: 'list usuarios_admin',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number', description: 'id del usuario' }
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: ListUsers
    },
    {
        path: '/api/usuarios_admin',
        method: 'POST',
        schema: {
            summary: 'created usuarios_admin',
            body: {
                type: 'object',
                required: ['username', 'password', 'role', 'accounts_id'],
                properties: {
                    username: { type: 'string', description: 'username' },  
                    password: { type: 'string', description: 'password' },  
                    role: { type: 'string', description: 'role', enum: ['administrador', 'super_admin'] },  
                    accounts_id: { type: 'number', description: 'accounts_id' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: SaveUser
    },
    {
        path: '/api/usuarios_admin/:id',
        method: 'PUT',
        schema: {
            summary: 'update account',
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
                    username: { type: 'string', description: 'username' },  
                    password: { type: 'string', description: 'password' },  
                    role: { type: 'string', description: 'role' },  
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: updateUser
    },
    {
        path: '/api/usuarios_admin/:id',
        method: 'DELETE',
        schema: {
            summary: 'delete usuarios_admin',
            params: { 
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number', description: 'id' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: deleteUser
    },
    {
        path: '/api/usuarios_admin_account/:id',
        method: 'POST',
        schema: {
            summary: 'assign account',
            params: { 
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number', description: 'id' },
                }
            },
            body: {
                type: 'object',
                required: ['accounts_id'],
                properties: {
                    accounts_id: { type: 'number', description: 'accounts_id' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: AsignarAccount
    },
    {
        path: '/api/usuarios_admin_account/reset_password/:id',
        method: 'PUT',
        schema: {
            summary: 'reset password',
            params: { 
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number', description: 'id' },
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
        handler: resetPassword
    },
    {
        path: '/api/usuarios_admin_account/reset_account/:id',
        method: 'PUT',
        schema: {
            summary: 'reset account',
            params: { 
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number', description: 'id' },
                }
            },
            body: {
                type: 'object',
                required: ['accounts_id'],
                properties: {
                    accounts_id: { type: 'number', description: 'accounts_id' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: resetAccount
    }
]
export default routes