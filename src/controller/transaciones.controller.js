import { conexion } from "../database/conexion";
import { ValidarRole } from "../function/validarRole";

export const ListarTransaccionesTiendas = async (req, reply) => {
    try {
        const { role, accounts_id } = await ValidarRole(req.params.id);
        console.log(role, accounts_id);
        if (role === "administrador") {
            const tienda = await conexion.query(`SELECT * FROM tiendas_transaciones WHERE accounts_id = ? ORDER BY id DESC`, [accounts_id]);
            reply.code(200).send({
                success: true,
                data: tienda[0]
            });
        } else if (role === "super_admin") {
            const transacciones = await conexion.query(`SELECT * FROM tiendas_transaciones ORDER BY id DESC`);
            reply.code(200).send({
                success: true,
                data: transacciones[0]
            });
        }
    } catch (error) {
        throw new Error("ListarTransaccionesTiendas-->  " + error);
    }
}

export const ListarHistorialCredito = async (req, reply) => {
    try {
        const { role, accounts_id } = await ValidarRole(req.params.id);
        console.log(role, accounts_id);
        if (role === "administrador") {
            const tienda = await conexion.query(`SELECT 
            tiendas_credito.id, 
            tiendas_credito.creditos, 
            tiendas_credito.transacion, tiendas_credito.forma_pago, 
            tienderos_usuarios.nombre_tienda,
            tiendas_credito.banco, tiendas_credito.fecha_registro, 
            accounts.accounts 
            FROM tiendas_credito 
            INNER JOIN accounts ON tiendas_credito.accounts_id = accounts.id 
            INNER JOIN tienderos_usuarios ON tienderos_usuarios.id = tiendas_credito.tienda_id
            WHERE accounts_id = ? ORDER BY tiendas_credito.fecha_registro DESC`, [accounts_id]);
            reply.code(200).send({
                success: true,
                data: tienda[0]
            });
        } else if (role === "super_admin") {
            const transacciones = await conexion.query(`SELECT 
            tiendas_credito.id, 
            tiendas_credito.creditos, 
            tiendas_credito.transacion, tiendas_credito.forma_pago, 
            tienderos_usuarios.nombre_tienda,
            tiendas_credito.banco, tiendas_credito.fecha_registro, 
            accounts.accounts 
            FROM tiendas_credito 
            INNER JOIN accounts ON tiendas_credito.accounts_id = accounts.id 
            INNER JOIN tienderos_usuarios ON tienderos_usuarios.id = tiendas_credito.tienda_id
            ORDER BY tiendas_credito.fecha_registro DESC`);
            reply.code(200).send({
                success: true,
                data: transacciones[0]
            });
        }
    } catch (error) {
        throw new Error("ListarTransaccionesTiendas-->  " + error);
    }
}

export const ListarSaldosRecargas = async (req, reply) => {
    try {
        const { role, accounts_id } = await ValidarRole(req.params.id);
        if (role === "administrador") {
            const tienda = await conexion.query(`SELECT 
            tienderos_usuarios.id,accounts.accounts, tienderos_usuarios.nombre_tienda, 
            tiendas_saldos.saldos FROM tienderos_usuarios 
            INNER JOIN tiendas_saldos 
            ON tienderos_usuarios.id = tiendas_saldos.tienda_id
            INNER JOIN accounts
            ON tienderos_usuarios.accounts_id = accounts.id
            WHERE tienderos_usuarios.accounts_id = ? ORDER BY id DESC`, [accounts_id]);
            console.log(tienda);
            reply.code(200).send({
                success: true,
                data: tienda[0]
            })
        } else if (role == "super_admin") {
            const transacciones = await conexion.query(`SELECT 
            tienderos_usuarios.id,accounts.accounts, tienderos_usuarios.nombre_tienda, 
            tiendas_saldos.saldos FROM tienderos_usuarios 
            INNER JOIN tiendas_saldos 
            ON tienderos_usuarios.id = tiendas_saldos.tienda_id
            INNER JOIN accounts
            ON tienderos_usuarios.accounts_id = accounts.id
            ORDER BY id DESC`);
            console.log(transacciones);
            reply.code(200).send({
                success: true,
                data: transacciones[0]
            })
        }
    } catch (error) {
        throw new Error("ListarTransaccionesRecargas-->  " + error);
    }
}

export const ListarTiendasMastransaciones = async (req, reply) => {
    try {
        const { role, accounts_id } = await ValidarRole(req.params.id);
        var defaul = req.params.count || 5;
        if (role === "administrador") {
            const tienda = await conexion.query(`SELECT tienderos_usuarios.nombre_tienda, SUM(tiendas_transaciones.cantidad) as cantidad, SUM(tiendas_transaciones.recaudacion) as recaudado
            FROM tienderos_usuarios JOIN tiendas_transaciones ON tienderos_usuarios.id = tiendas_transaciones.tienda_id
            WHERE tienderos_usuarios.accounts_id = ?
            GROUP BY tiendas_transaciones.tienda_id
             ORDER BY cantidad DESC LIMIT ?`, [accounts_id, defaul]);
            reply.code(200).send({
                success: true,
                data: tienda[0]
            })
        } else if (role == "super_admin") {
            const transacciones = await conexion.query(`SELECT tienderos_usuarios.nombre_tienda, SUM(tiendas_transaciones.cantidad) as cantidad, SUM(tiendas_transaciones.recaudacion) as recaudado
            FROM tienderos_usuarios JOIN tiendas_transaciones ON tienderos_usuarios.id = tiendas_transaciones.tienda_id
            GROUP BY tiendas_transaciones.tienda_id
             ORDER BY cantidad DESC LIMIT ?`, [defaul]);
            reply.code(200).send({
                success: true,
                data: transacciones[0]
            })
        }
    } catch (error) {
        throw new Error("ListarTransaccionesRecargas-->  " + error);
    }
}