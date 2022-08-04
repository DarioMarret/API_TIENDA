import { LoginAdmin, LoginTienda } from "../controller/login.controller";
import { ValidacionBasic } from "../function/ValidacionBasic";



const routes = [
    {
        path: '/api/login_admin',
        method: 'POST',
        schema: {
            summary: 'login admin',
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    username: { type: 'string', description: 'username' },
                    password: { type: 'string', description: 'password' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: LoginAdmin
    },
    {
        path: '/api/login_tienda',
        method: 'POST',
        schema: {
            summary: 'login tienda',
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    username: { type: 'string', description: 'username' },
                    password: { type: 'string', description: 'password' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: LoginTienda
    }
]

export default routes;