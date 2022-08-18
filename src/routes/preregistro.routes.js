import { ListarPreRegistroTienda, ListarPreRegistroTiendaAdmin, Preregistro } from "../controller/preregistro.controller"
import { ValidacionBasic } from "../function/ValidacionBasic"




const routes = [
    {
        path: '/api/preregistro',
        method: 'POST',
        onRequest: ValidacionBasic,
        handler: ListarPreRegistroTienda
    },
    {
        path: '/api/preregistro_save',
        method: 'POST',
        onRequest: ValidacionBasic,
        handler: Preregistro
    },
    {
        path: '/api/preregistro/:id',
        method: 'GET',
        onRequest: ValidacionBasic,
        handler: ListarPreRegistroTiendaAdmin
    },
]

export default routes;