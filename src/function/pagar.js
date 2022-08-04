import moment from "moment";
import { conexion } from "../database/conexion";
moment.locale("es");

export const ConsultarSaldoActual = async (idtienda) => {
    try {
        const result = await conexion.query(`SELECT saldo FROM saldos WHERE idtienda = ?`, [idtienda])
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
        const { data } = await axios.post(`${process.env.mikrowisp}GetClientsDetails`, { cedula, "token": process.env.token_mikrowisp }) // consultamo cliente
        let dC = data.datos[0]
        if (dC.estado == "SUSPENDIDO") {
            console.log("esntro a sunspencion", dC.estado)
            let fecha_suspendido = dC.fecha_suspendido
            let dataActual = new Date()
            console.log("dataActual", dataActual);
            let forma_fecha = moment(dataActual).format("YYYY-MM-DD")
            var a = moment(dataActual);//now
            var b = moment(fecha_suspendido);
            let dia_diferancia = a.diff(b, 'days')
            if (dia_diferancia >= 5) {
                const { data } = await axios.post(`${process.env.mikrowisp}NewTicket`, {
                    "token": process.env.token_mikrowisp,
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

    export const guardarTransaccion = async (idtienda, idcliente, idfactura, idtransaccion, total) => {
        try {
            return new Promise((resolve, reject) => {
                let estado = true
                let sql = "INSERT INTO transaciones (id_tienda,idcliente,idfactura,idtransacion,cantidad,estado) VALUES (?, ?, ?, ?, ?, ?)";
                conexion.query(sql, [idtienda, idcliente, idfactura, idtransaccion, total, estado], async (err, result) => {
                    if (err) {
                        reject(err)
                        console.log(err)
                    }
                    if (result) {
                        resolve(result)
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

    export const sacarLinkFactura = async (idfactura) => {
        const { data } = await axios.post(`${process.env.mikrowisp}GetInvoice`, { idfactura, "token": process.env.token_mikrowisp })
        return data.factura.urlpdf
    }

    export const actualizarsaldoalpagar = async (idtienda, saldo) => {
        return new Promise((resolve, reject) => {
            let fecha = new Date()
            let sql = "UPDATE saldos SET saldo = ?, fecha_saldo = ? WHERE idtienda = ?";
            conexion.query(sql, [saldo, fecha, idtienda], async (err, result) => {
                if (err) {
                    reject(err)
                    console.log(err)
                }
                if (result.length > 0) {
                    resolve(result)
                } else {
                    resolve(null)
                }
            })
        })
    }
