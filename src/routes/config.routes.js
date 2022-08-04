import { ListBanks, ListWays } from "../controller/config.controller";
import { ValidacionBasic } from "../function/ValidacionBasic";

const routes = [
    {
        path: '/api/banks',
        method: 'GET',
        schema: {
            summary: 'list banks',
        },
        onRequest: ValidacionBasic,
        handler: ListBanks
    },
    {
        path: '/api/way_to_pay',
        method: 'GET',
        schema: {
            summary: 'way to pay',
        },
        onRequest: ValidacionBasic,
        handler: ListWays
    },
]

export default routes;