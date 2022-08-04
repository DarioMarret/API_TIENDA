import { conexion } from "../database/conexion"
import { Saldos } from "../function/saldoYcredito"

export const recargarTienda = async (req, reply) => {
    try {
        const { tienda_id, accounts_id, saldo, transacion, forma_pago, banco } = req.body
        const saldo_actual = await Saldos(tienda_id, accounts_id, saldo, transacion, forma_pago, banco)
        reply.status(200).send({ 
            success: true,
            message: "recargar tienda",
            data: saldo_actual
         })
    } catch (error) {
        throw new Error("recargarTienda-->"+ error)
    }
}

export const ListRecarga = async (req, reply) => {
    try {
        const { tienda_id } = req.params
        const historySaldo = await conexion.query(`SELECT id, creditos, transacion, forma_pago, banco, fecha_registro FROM tiendas_credito WHERE tienda_id = ?`, [tienda_id])
        reply.status(200).send({ 
            success: true,
            message: "recargar tienda",
            data: historySaldo[0]
        })
    } catch (error) {
        throw new Error("recargarTienda-->"+ error)
    }
}
