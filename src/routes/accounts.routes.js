import { deleteAccount, ListAccounts, SaveAccount, updateAccount } from "../controller/accounts.controlles"
import { ValidacionBasic } from "../function/ValidacionBasic"




const routes = [
    {
        path: '/api/accounts/:id',
        method: 'GET',
        schema: {
            summary: 'list accounts',
            tags: ['Accounts'],
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'number', description: 'id del accounts' }
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: ListAccounts
    },
    {
        path: '/api/accounts',
        method: 'POST',
        // schema: {
        //     summary: 'created account',
        //     body: {
        //         type: 'object',
        //         required: ['accounts'],
        //         properties: {
        //             accounts: { type: 'string', description: 'accounts' },  
                    
        //         }
        //     }
        // },
        onRequest: ValidacionBasic,
        handler: SaveAccount
    },
    {
        path: '/api/accounts/:id',
        method: 'PUT',
        schema: {
            summary: 'update account',
            params: { 
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', description: 'id' },
                }
            },
            body: {
                type: 'object',
                required: ['accounts'],
                properties: {
                    accounts: { type: 'string', description: 'accounts' },  
                    
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: updateAccount
    },
    {
        path: '/api/accounts/:enable/:accounts_id',
        method: 'DELETE',
        schema: {
            summary: 'delete account',
            params: { 
                type: 'object',
                required: ['enable','accounts_id'],
                properties: {
                    enable: { type: 'string', description: 'number' },
                    accounts_id: { type: 'string', description: 'number' },
                }
            }
        },
        onRequest: ValidacionBasic,
        handler: deleteAccount
    }
]
export default routes