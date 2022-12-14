import { conexion } from "../database/conexion";
import { ValidarRole } from "../function/validarRole";

export const ListarTransaccionesTiendas = async (req, reply) => {
    try {
        const { role, accounts_id } = await ValidarRole(req.params.id);
        console.log(role, accounts_id);
        if (role === "administrador") {
            const tienda = await conexion.query(`SELECT tiendas_transaciones.id,tiendas_transaciones.accounts_id, 
            tiendas_transaciones.factura_id, tiendas_transaciones.transacion_id, tiendas_transaciones.cantidad, 
            tiendas_transaciones.recaudacion, tiendas_transaciones.cliente, tiendas_transaciones.cedula, tiendas_transaciones.telefono, 
            tiendas_transaciones.movil, tiendas_transaciones.fecha_registro, tienderos_usuarios.nombre_tienda,
            tiendas_transaciones.ticket 
            FROM tiendas_transaciones INNER JOIN tienderos_usuarios ON tiendas_transaciones.tienda_id = tienderos_usuarios.id 
            WHERE tiendas_transaciones.accounts_id = ? ORDER BY tiendas_transaciones.id DESC`, [accounts_id]);
            reply.code(200).send({
                success: true,
                data: tienda[0]
            });
        } else if (role === "super_admin") {
            const transacciones = await conexion.query(`SELECT tiendas_transaciones.id,tiendas_transaciones.accounts_id, 
            tiendas_transaciones.factura_id, tiendas_transaciones.transacion_id, tiendas_transaciones.cantidad, 
            tiendas_transaciones.recaudacion, tiendas_transaciones.cliente, tiendas_transaciones.cedula, tiendas_transaciones.telefono, 
            tiendas_transaciones.movil, tiendas_transaciones.fecha_registro, tienderos_usuarios.nombre_tienda,
            tiendas_transaciones.ticket 
            FROM tiendas_transaciones INNER JOIN tienderos_usuarios ON tiendas_transaciones.tienda_id = tienderos_usuarios.id 
            ORDER BY tiendas_transaciones.id DESC`);
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
            tiendas_credito.nombre_admin, 
            tiendas_credito.transacion, tiendas_credito.forma_pago, 
            tienderos_usuarios.nombre_tienda,
            tiendas_credito.banco, tiendas_credito.fecha_registro, 
            accounts.accounts 
            FROM tiendas_credito 
            INNER JOIN accounts ON tiendas_credito.accounts_id = accounts.id 
            INNER JOIN tienderos_usuarios ON tienderos_usuarios.id = tiendas_credito.tienda_id
            WHERE tiendas_credito.accounts_id = ? ORDER BY tiendas_credito.fecha_registro DESC`, [accounts_id]);
            reply.code(200).send({
                success: true,
                data: tienda[0]
            });
        } else if (role === "super_admin") {
            const transacciones = await conexion.query(`SELECT 
            tiendas_credito.id, 
            tiendas_credito.creditos, 
            tiendas_credito.nombre_admin,
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
            reply.code(200).send({
                success: true,
                data: transacciones[0]
            })
        }
    } catch (error) {
        throw new Error("ListarTransaccionesRecargas-->  " + error);
    }
}

//falta accion
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

export const ListarCard = async (req, reply) => {
    try {
        const { role, accounts_id } = await ValidarRole(req.params.id);
        if (role === "administrador") {
            const tienda = await conexion.query(`SELECT (select count(*) from accounts where id = ${accounts_id})as total_accounts, 
            (select count(*) from tienderos_usuarios where accounts_id = ${accounts_id})as total_tienda, 
            (select count(*) from tiendas_transaciones where accounts_id = ${accounts_id})as total_transaciones, 
            (select sum(tiendas_transaciones.cantidad) from tiendas_transaciones where accounts_id = ${accounts_id})as total, 
            (select sum(tiendas_transaciones.recaudacion) from tiendas_transaciones where accounts_id = ${accounts_id})as total_recaudado 
            FROM DUAL`);
            reply.code(200).send({
                success: true,
                data: tienda[0]
            })
        } else if (role == "super_admin") {
            const transacciones = await conexion.query(`SELECT 
            (select count(*) from accounts)as total_accounts, 
            (select count(*) from tienderos_usuarios)as total_tienda, 
            (select count(*) from tiendas_transaciones)as total_transaciones, 
            (select sum(tiendas_transaciones.cantidad) from tiendas_transaciones)as total, 
            (select sum(tiendas_transaciones.recaudacion) from tiendas_transaciones)as total_recaudado FROM DUAL`);
            reply.code(200).send({
                success: true,
                data: transacciones[0]
            })
        }
    } catch (error) {
        throw new Error("ListarTransaccionesRecargas-->  " + error);
    }
}