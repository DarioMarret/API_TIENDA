import { conexion } from "../database/conexion";
import moment from "moment";
import axios from "axios";
import { ValidarRole } from "../function/validarRole";

moment.locale("es");

export const Preregistro = async (req, reply) => {
    const { accounts_id, tienda_id, token, cliente, cedula, direccion, telefono, movil, email, notas } = req.body;
    let fecha_instalacion = moment().format("YYYY-MM-DD HH:mm:ss");
    let estado_aprobado = "PENDIENTE";
    let canjear = "---";
    const respuesta = await conexion.query(`INSERT INTO preregistros 
    (accounts_id, tienda_id, token, cliente, cedula, direccion, telefono, movil, email, notas, fecha_instalacion, estado_aprobado, canjear) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
    [accounts_id, tienda_id, token, cliente, cedula, direccion, telefono, movil, email, notas, fecha_instalacion, estado_aprobado, canjear])
    if (!respuesta) {
        reply.code(500).send({
            success: false,
            message: "Error al guardar el registro"
        });
    } else {
        const { data } = await axios.post('http://45.224.96.50/api/v1/NewPreRegistro', {
            "token": token,
            "cliente": cliente,
            "cedula": cedula,
            "direccion": direccion,
            "telefono": telefono,
            "movil": movil,
            "email": email,
            "notas": notas,
            "fecha_instalacion": fecha_instalacion
          })
          console.log(data)
          console.log("\n")
        reply.code(200).send({
            success: true,
            message: "Registro guardado",
            data: respuesta[0]
        });
    }
}

export const PreregistroAprobar = async (req, reply) => {
    const { tienda_id } = req.body;
    let fecha_aprobado = moment().format("YYYY-MM-DD HH:mm:ss");
    const respuesta = await conexion.query(`UPDATE preregistros SET estado_aprobado = true, fecha_aprobado = ? WHERE tienda_id = ?`,
    [fecha_aprobado, tienda_id])
    if (!respuesta) {
        reply.code(500).send({
            success: false,
            message: "Error al guardar el registro"
        });
    } else {
        reply.code(200).send({
            success: true,
            message: "Registro guardado",
            data: respuesta[0]
        });
    }
}

export const ListarPreRegistroTienda = async (req, reply) => {
    const { tienda_id } = req.body;
    const respuesta = await conexion.query(`SELECT * FROM preregistros WHERE tienda_id = ?`, [tienda_id])
    if (!respuesta) {
        reply.code(500).send({
            success: false,
            message: "Error al guardar el registro"
        });
    } else {
        reply.code(200).send({
            success: true,
            message: "Registro guardado",
            data: respuesta[0]
        });
    }
}

export const ListarPreRegistroTiendaAdmin = async (req, reply) => {
    const { role, accounts_id } = await ValidarRole(req.params.id);
    if (role === "administrador") {
        const tienda = await conexion.query(`SELECT preregistros.id, 
        preregistros.cliente, preregistros.cedula, preregistros.direccion, 
        preregistros.telefono, preregistros.movil, preregistros.email, preregistros.notas, preregistros.fecha_instalacion,
        accounts.accounts, tienderos_usuarios.nombre_tienda
        FROM preregistros 
        INNER JOIN tienderos_usuarios ON preregistros.tienda_id = tienderos_usuarios.id 
        INNER JOIN accounts ON accounts.id = preregistros.accounts_id 
        WHERE preregistros.accounts_id = ? ORDER BY preregistros.id DESC`, [accounts_id]);
        reply.code(200).send({
            success: true,
            data: tienda[0]
        });
    } else if (role === "super_admin") {
        const respuesta = await conexion.query(`SELECT preregistros.id, 
        preregistros.cliente, preregistros.cedula, preregistros.direccion, 
        preregistros.telefono, preregistros.movil, preregistros.email, preregistros.notas, preregistros.fecha_instalacion,
        accounts.accounts, tienderos_usuarios.nombre_tienda
        FROM preregistros 
        INNER JOIN tienderos_usuarios ON preregistros.tienda_id = tienderos_usuarios.id 
        INNER JOIN accounts ON accounts.id = preregistros.accounts_id`)
        reply.code(200).send({
            success: true,
            data: respuesta[0]
        });
    }
}