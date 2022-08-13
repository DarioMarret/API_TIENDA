import { conexion } from "../database/conexion";
import moment from "moment";

moment.locale("es");

/**
 * 
 * @param {*} tienda_id 
 * @returns {saldo_actual}
 */
async function SandoActula(tienda_id) {
    try {
        const saldo_actual = await conexion.query(`SELECT saldos FROM tiendas_saldos WHERE tienda_id = ?`, [tienda_id]);
        console.log("saldo actual", saldo_actual[0][0].saldos)
        if (saldo_actual[0].length > 0) {
            return saldo_actual[0][0].saldos;
        }else{
            return 0;
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param {*} tienda_id 
 * @param {*} accounts_id 
 * @param {*} creditos 
 * @param {*} transacion 
 * @param {*} forma_pago 
 * @param {*} banco 
 * @param {*} fecha_registro 
 * @returns {boolean}
 */
export async function insertarSaldoHistorialCredito(tienda_id, accounts_id, creditos, transacion, forma_pago, banco, fecha_registro) {
    try {
        const saldo_actual = await conexion.query(`INSERT INTO tiendas_credito (tienda_id, accounts_id, creditos, transacion, forma_pago, banco, nombre_admin, fecha_registro) 
        VALUES (?,?,?,?,?,?,?,?)`, [tienda_id, accounts_id, creditos, transacion, forma_pago, banco, nombre_admin, fecha_registro]);
        if (!saldo_actual) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param {*} tienda_id 
 * @param {*} accounts_id 
 * @param {*} saldo 
 * @param {*} transacion 
 * @param {*} forma_pago 
 * @param {*} banco 
 * @returns  {boolean}
 */
export const Saldos = async (tienda_id, accounts_id, saldo, transacion, forma_pago, banco, nombre_admin) => {
    try {
        let saldo_actual = await SandoActula(tienda_id)
        let nuevosaldo = (parseFloat(saldo_actual) + parseFloat(saldo))
        let fecha_registro = moment().format("YYYY-MM-DD HH:mm:ss");
        const response = await conexion.query(`UPDATE tiendas_saldos SET saldos = ?, fecha_registro = ? WHERE tienda_id = ?`, [nuevosaldo, fecha_registro, tienda_id]);
        if (!response) {
            throw new Error("Error al actualizar el saldo");
        } else {
            await insertarSaldoHistorialCredito(tienda_id, accounts_id, saldo, transacion, forma_pago, banco, fecha_registro, nombre_admin)
            return saldo_actual;
        }
    } catch (error) {
        throw new Error("Saldos-->  " + error);
    }
}

/**
 * 
 * @param {*} accounts_id 
 * @param {*} tienda_id 
 */
export const defaultsaldo = async (accounts_id, tienda_id) => {
    try {
        let fecha_registro = moment().format("YYYY-MM-DD HH:mm:ss");
        let saldo = 0.0
        console.log(accounts_id,"\n", tienda_id,"\n", saldo,"\n", fecha_registro)
        await conexion.query(`INSERT INTO tiendas_saldos (accounts_id, tienda_id, saldos, fecha_registro) VALUES (?, ?, ?, ?)`, [accounts_id, tienda_id, saldo, fecha_registro]);
    } catch (error) {
        console.log(error)
    }
}