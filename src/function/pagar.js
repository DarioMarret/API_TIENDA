import moment from "moment";
import { conexion } from "../database/conexion";
import axios from "axios";
moment.locale("es");

export const ConsultarSaldoActual = async (tienda_id) => {
    try {
        const result = await conexion.query(`SELECT tiendas_saldos FROM saldos WHERE tienda_id = ?`, [tienda_id])
        if (result[0].length > 0) {
            return result[0][0].saldo
        } else {
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export const tikecSuspencion = async (cedula, idcliente, pasarela) => {
    const { data } = await axios.post(`${process.env.mikrowisp}GetClientsDetails`, { cedula, "token": `${process.env.token_mikrowisp}` }) // consultamo cliente
    let dC = data.datos[0]
    if (dC.estado == "SUSPENDIDO") {
        console.log("estado a sunspencion", dC.estado)
        let fecha_suspendido = dC.fecha_suspendido
        let dataActual = new Date()
        console.log("dataActual", dataActual);
        let forma_fecha = moment(dataActual).format("YYYY-MM-DD")
        var a = moment(dataActual);//now
        var b = moment(fecha_suspendido);
        let dia_diferancia = a.diff(b, 'days')
        if (dia_diferancia >= 5) {
            const { data } = await axios.post(`${process.env.mikrowisp}NewTicket`, {
                "token": `${process.env.token_mikrowisp}`,
                "idcliente": idcliente,
                "dp": 2,
                "asunto": "VERIFICAR FACTURACION",
                "solicitante": `${dC.nombre}`,
                "fechavisita": `${forma_fecha}`,
                "turno": "TARDE",
                "agendado": "RED SOCIAL",
                "contenido": `Verificar Facturacion>> Fecha Suspendido ${fecha_suspendido} Fecha de Pago ${forma_fecha}  /  PROTOCOLO ${pasarela}`
            })// creando tike
            console.log(data)
        }
    }
}

export const NumeroAleatorio = () => {
    const r = Math.random() * (10000000 - 99999999) + 99999999
    return Math.floor(r)
}

export const guardarTransaccion = async (data, transaccion_id) => {
    try {
        //idtienda, idcliente, idfactura, idtransaccion, total
        const { } = data
        let estado = true
        const result = await conexion.query(`INSERT INTO tiendas_transaciones 
        (accounts_id, tienda_id, factura_id, transaccion_id, cantidad, recaudacion, idcliente, cliente, cedula, telefono, movil, estado fecha_registro)) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [accounts_id, tienda_id, idfactura, transaccion_id, total, recaudacion, idcliente, cliente, cedula, telefono, movil, estado, moment.format("YYYY-MM-DD HH:mm:ss")])
        if (result) {
            return result
        }
    } catch (error) {
        console.log(error);
    }
}

export const sacarLinkFactura = async (idfactura) => {
    try {
        const { data } = await axios.post(`${process.env.mikrowisp}GetInvoice`, { idfactura, "token": `${process.env.token_mikrowisp}` })
        return data.factura.urlpdf
    } catch (error) {
        console.log(error)
    }
}

export const actualizarsaldoalpagar = async (tienda_id, saldo) => {
    try {
        const result = await conexion.query(`UPDATE tiendas_saldos SET saldos = ?, fecha_registro = ? WHERE tienda_id = ?`, [saldo, moment.format("YYYY-MM-DD HH:mm:ss", tienda_id)])
        if (result.length > 0) {
            return result[0]
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}
