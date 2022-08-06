import { conexion } from "../database/conexion";
import moment from "moment";
import { hashPassword } from "../function/bcrypt";
import { defaultsaldo } from "../function/saldoYcredito";
import { estadoAccounts } from "../function/estadoAccounts";
import { ValidarRole } from "../function/validarRole";

moment.locale("es");

export const ListTiendas = async (req, reply) => {
    try {
        const { role, accounts_id } = await ValidarRole(req.params.id);
        const estadoA = await estadoAccounts(accounts_id);
        var tienda;
        if (role == "administrador" && estadoA == true) {
            tienda = await conexion.query(`SELECT 
            tienderos_usuarios.id,tienderos_usuarios.accounts_id, accounts.accounts, tienderos_usuarios.nombre_tienda, 
            tienderos_usuarios.responsable, tienderos_usuarios.cedula, tienderos_usuarios.comision, tienderos_usuarios.token_sistema, 
            tienderos_usuarios.direccion,tienderos_usuarios.usuario,
            tiendas_saldos.saldos FROM tienderos_usuarios 
            INNER JOIN tiendas_saldos 
            ON tienderos_usuarios.id = tiendas_saldos.tienda_id
            INNER JOIN accounts
            ON tienderos_usuarios.accounts_id = accounts.id
            WHERE tienderos_usuarios.accounts_id = ?`, [accounts_id])
        } else if (role == "super_admin" && estadoA == true) {
            tienda = await conexion.query(`SELECT 
            tienderos_usuarios.id,tienderos_usuarios.accounts_id, accounts.accounts, tienderos_usuarios.nombre_tienda, tienderos_usuarios.responsable, tienderos_usuarios.cedula, tienderos_usuarios.comision, tienderos_usuarios.token_sistema, tienderos_usuarios.direccion,tienderos_usuarios.usuario,
            tiendas_saldos.saldos FROM tienderos_usuarios 
            INNER JOIN tiendas_saldos 
            ON tienderos_usuarios.id = tiendas_saldos.tienda_id
            INNER JOIN accounts
            ON accounts.id = tienderos_usuarios.accounts_id`)
        }

        function removeDuplicates(originalArray, prop) {
            var newArray = [];
            var lookupObject = {};
            for (var i in originalArray) {
                lookupObject[originalArray[i][prop]] = originalArray[i];
            }
            for (i in lookupObject) {
                newArray.push(lookupObject[i]);
            }
            return newArray;
        }

        var uniqueArray = removeDuplicates(tienda[0], "id");
        console.log(uniqueArray);

        if (!tienda) {
            reply.code(500).send({
                success: false,
                message: "Error al listar las tiendas"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "Tiendas listadas",
                data: tienda[0],
            });
        }
    } catch (error) {
        throw new Error("ListTiendas-->  " + error);
    }
}

export const SaveTiendas = async (req, reply) => {
    try {
        const { account_id, nombre_tienda, responsable, cedula, comision, token_sistema, password, direccion, usuario, telefono } = req.body;
        let recaudacion = comision == 0 ? 0.50 : parseFloat(comision);
        let fecha_registro = moment().format("YYYY-MM-DD HH:mm:ss");
        const hash = await hashPassword(password);
        const tienda = await conexion.query(`INSERT INTO tienderos_usuarios (accounts_id, nombre_tienda, responsable, cedula, comision, token_sistema, password, fecha_registro, direccion, usuario, telefono) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, [account_id, nombre_tienda, responsable, cedula, recaudacion, token_sistema, hash, fecha_registro, direccion, usuario, telefono]);
        if (!tienda) {
            reply.code(500).send({
                success: false,
                message: "Error al guardar la tienda"
            });
        } else {
            await defaultsaldo(account_id, tienda[0].insertId)
            reply.code(200).send({
                success: true,
                message: "Tienda guardada",
                tienda_id: tienda[0].insertId
            });
        }
    } catch (error) {
        throw new Error("SaveTiendas-->  " + error);
    }
}

export const UpdateTiendasPassword = async (req, reply) => {
    try {
        const { password } = req.body;
        let hash = await hashPassword(password)
        const tienda = await conexion.query(`UPDATE tienderos_usuarios SET password = ? WHERE id = ?`, [hash, req.params.id]);
        if (!tienda) {
            reply.code(500).send({
                success: false,
                message: "Error al actualizar la tienda"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "password actualizada"
            });
        }
    } catch (error) {
        throw new Error("UpdateTiendas-->  " + error);
    }
}

export const UpdateTiendas = async (req, reply) => {
    try {
        const { nombre_tienda, responsable, cedula, comision, token_sistema, direccion, usuario, telefono } = req.body;
        comision == null ? 0.50 : parseFloat(comision);
        const tienda = await conexion.query(`UPDATE tienderos_usuarios SET nombre_tienda = ?, responsable = ?, cedula = ?, comision = ?, token_sistema = ?, direccion = ?, usuario = ?, telefono = ? WHERE id = ?`, [nombre_tienda, responsable, cedula, comision, token_sistema, direccion, usuario, telefono, req.params.id]);
        if (!tienda) {
            reply.code(500).send({
                success: false,
                message: "Error al actualizar la tienda"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "Tienda actualizada"
            });
        }
    } catch (error) {
        throw new Error("UpdateTiendas-->  " + error);
    }
}

export const DeleteTiendas = async (req, reply) => {
    try {
        const tienda = await conexion.query(`DELETE FROM tienderos_usuarios WHERE id = ?`, [req.params.id]);
        if (!tienda) {
            reply.code(500).send({
                success: false,
                message: "Error al eliminar la tienda"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "Tienda eliminada"
            });
        }
    } catch (error) {
        throw new Error("DeleteTiendas-->  " + error);
    }
}

export const ListTiendasCedula = async (req, reply) => {
    try {
        const tienda = await conexion.query(`SELECT 
        tienderos_usuarios.accounts_id, tienderos_usuarios.cedula, 
        tienderos_usuarios.comision, tienderos_usuarios.id as tienda_id, 
        tienderos_usuarios.nombre_tienda, tienderos_usuarios.token_sistema, 
        tienderos_usuarios.usuario, tienderos_usuarios.responsable, 
        tiendas_saldos.saldos
        FROM tienderos_usuarios 
        INNER JOIN tiendas_saldos
        ON tienderos_usuarios.accounts_id = tiendas_saldos.accounts_id
        WHERE tienderos_usuarios.cedula = ?`, [req.body.cedula]);
        if (!tienda) {
            reply.code(500).send({
                success: false,
                message: "Error al tienda"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "Tienda encontrada",
                data: tienda[0]
            });
        }
    } catch (error) {
        throw new Error("DeleteTiendas-->  " + error);
    }
}

export const ListarTransaccionesTienda = async (req, reply) => {
    try {
        const tienda = await conexion.query(`SELECT * FROM tiendas_transaciones WHERE tienda_id = ? ORDER BY id DESC`, [req.params.id]);
        if (!tienda) {
            reply.code(500).send({
                success: false,
                message: "Error al tienda"
            });
        } else {
            reply.code(200).send({
                success: true,
                data: tienda[0]
            });
        }
    } catch (error) {
        throw new Error("DeleteTiendas-->  " + error);
    }
}

export const ListarTransacionesUltimas = async (req, reply) => {
    try {
        const tienda = await conexion.query(`SELECT * FROM tiendas_transaciones WHERE tienda_id = ? ORDER BY id DESC LIMIT 5`, [req.params.id]);
        if (!tienda) {
            reply.code(500).send({
                success: false,
                message: "Error al tienda"
            });
        } else {
            reply.code(200).send({
                success: true,
                data: tienda[0]
            });
        }
    } catch (error) {
        throw new Error("ListarTransacionesUltimas-->  " + error);
    }
}
export const ListarHistorialTienda = async (req, reply) => {
    try {
        const tienda = await conexion.query(`SELECT * FROM tiendas_credito WHERE tienda_id = ? ORDER BY id DESC`, [req.params.id]);
        if (!tienda) {
            reply.code(500).send({
                success: false,
                message: "Error al tienda"
            });
        } else {
            reply.code(200).send({
                success: true,
                data: tienda[0]
            });
        }
    } catch (error) {
        throw new Error("DeleteTiendas-->  " + error);
    }
}

export const ListarSaldosTienda = async (req, reply) => {
    try {
        const tienda = await conexion.query(`SELECT * FROM tiendas_saldos WHERE tienda_id = ?`, [req.params.id]);
        if (!tienda) {
            reply.code(500).send({
                success: false,
                message: "Error al tienda"
            });
        } else {
            reply.code(200).send({
                success: true,
                data: tienda[0]
            });
        }
    } catch (error) {
        throw new Error("ListarSaldosTienda-->  " + error);
    }
}

export const TotalesCard = async (req, reply) => {
    try {
        const tienda = await conexion.query(`SELECT 
        tiendas_saldos.saldos as saldo,
        SUM(tiendas_transaciones.cantidad) as transacciones,
        COUNT(tiendas_transaciones.cantidad) as transacciones_count,
        SUM(tiendas_transaciones.recaudacion) as recaudacion
        FROM tiendas_saldos
        INNER JOIN tiendas_transaciones
        ON tiendas_saldos.accounts_id = tiendas_transaciones.accounts_id
        WHERE tiendas_saldos.tienda_id = ?`, [req.params.id]);
        if (!tienda) {
            reply.code(500).send({
                success: false,
                message: "Error al tienda"
            });
        } else {
            reply.code(200).send({
                success: true,
                data: tienda[0][0]
            });
        }
    } catch (error) {
        throw new Error("TotalesCard-->  " + error);
    }
}