import { actualizarsaldoalpagar, ConsultarSaldoActual, guardarTransaccion, NumeroAleatorio, tikecSuspencion } from '../function/pagar'
import { NoCliente } from '../function/NoCliente'
import axios from 'axios'
import 'dotenv/config'

export const ShearClient = async (req, reply) => {
    try {
        const { cedula, host, token } = req.body
        console.log(req.body)
        const { data } = await axios.post(`${host}GetClientsDetails`, { cedula, "token": `${token}` }) // consultamo cliente
        console.log(data)
        console.log("\n")
        if (data.estado == "error") {

            await NoCliente(cedula, host, token, reply) // crear funcion de no cliente 

        } else {

            var id = data.datos[0].id // separamos los servicio de la respuesta (array)
            let dC = data.datos[0]

            let datosClient = `${dC.nombre} ${dC.estado}`// Correo:${dC.correo} \n contacto:${dC.movil} Direcion:\n ${dC.direccion_principal} \n Cantidad de facturas No pagadas ${dC.facturacion.facturas_nopagadas} Total pendiente:${dC.facturacion.total_facturas}`;

            const response = await axios.post(`${host}GetInvoices`, { "idcliente": id, "estado": 1, "token": `${host}` })
            if (response.data.estado == "error") {
                reply.send({
                    success: true,
                    msg: response.data.mensaje
                })
            } else {
                let datos = response.data
                let info = []
                let total = 0
                let idfactura = []
                let idcliente = ""
                let fecha_corte_ultima = ""
                datos.facturas.map((data) => {
                    total += parseFloat(data.total)
                    idfactura.push(data.id)
                    idcliente = data.idcliente
                    fecha_corte_ultima = data.vencimiento
                    let x = {
                        idcliente: data.idcliente,
                        idfactura: data.id,
                        detalle: `Emitida ${data.emitido} vencimiento ${data.vencimiento} total ${data.total}`,
                        total: parseFloat(data.total),
                        info: { direccion: dC.direccion_principal, 
                            cedula: cedula, fecha_corte: data.vencimiento, 
                            total: parseFloat(data.total), idfactura: data.id,
                            telefono: dC.telefono, movil: dC.movil
                         }
                    }
                    info.push(x)
                })
                reply.send([...info, {
                    idfactura, idcliente, detalle: `Total a pagar ${total}`, total, "success": true,
                    info: { direccion: dC.direccion_principal, 
                        cedula: cedula, fecha_corte: fecha_corte_ultima, 
                        total: parseFloat(total), idfactura,
                        telefono: dC.telefono, movil: dC.movil
                     }
                }, { datosClient }])
            }
        }

    } catch (error) {
        throw new Error("ShearClient--> " + error)
    }
}


export const Facturas = async (req, reply) => {
    const { idfactura, host, token } = req.body
    console.log(req.body)   
    let existe = idfactura.indexOf(',')
    if (existe !== -1) {
        let idfacturaArray = idfactura.split(',')
        let total = 0
        let description = ""
        for (let index = 0; index < idfacturaArray.length; index++) {
            let idfactura = idfacturaArray[index];
            const { data } = await axios.post(`${host}GetInvoice`, { idfactura, "token": token })
            description += `${index + 1}) ${data.items[0].descrp} \n`
            total += parseFloat(data.factura.total)
        }
        await reply.send({ description, total, idfactura })
    } else {
        const { data } = await axios.post(`${host}GetInvoice`, { idfactura, "token": token })
        let description = data.items[0].descrp
        let total = data.factura.total
        await reply.send({ description, total, idfactura })
    }
}


export const Pagar = async (req, reply) => {
    const { cedula, idfactura, total, pasarela, id_tienda, idcliente, token_sistema, host, token} = req.body
    const saldoactual = await ConsultarSaldoActual(id_tienda)
    console.log(saldoactual)
    console.log("\n")
    if (saldoactual != null) {
        if (parseFloat(saldoactual) > parseFloat(total)) {
            await tikecSuspencion(cedula, idcliente, pasarela, host, token)
            const transacion_id = NumeroAleatorio()
            let optiones = {
                "token": token_sistema,
                "idfactura": idfactura,
                "pasarela": "RECAUDACION-TIENDAS",
                "cantidad": total,
                "nota": pasarela,
                "idtransaccion": transacion_id,
                "fecha": new Date(),
            }
            const { data } = await axios.post(`${host}PaidInvoice`, optiones)
            if (data.estado == "error") {
                await reply.send({
                    success: false,
                    msg: `${data.mensaje}`,
                })
            } else {
                await guardarTransaccion(req.body, transacion_id, host, token)
                let saldo = parseFloat(saldoactual) - parseFloat(total)
                await actualizarsaldoalpagar(id_tienda, saldo, host, token)
                await reply.send({
                    success: true,
                    data,
                    transacion_id,
                })
            }
        } else {
            await reply.send({
                success: false,
                msg: "Saldo insuficiente para realizar esta transacion"
            })
        }
    } else {
        await reply.send({
            success: false,
            msg: "Actual mente no cuenta con saldo para transacionar"
        })
    }
}


