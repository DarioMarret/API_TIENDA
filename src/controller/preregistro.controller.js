import { conexion } from "../database/conexion";
import moment from "moment";
import axios from "axios";

moment.locale("es");

export const Preregistro = async (req, reply) => {
    const { accounts_id, tienda_id, token, cliente, cedula, direccion, telefono, movil, email, notas } = req.body;
    let fecha_instalacion = moment().format("YYYY-MM-DD HH:mm:ss");
    let estado_aprobado = false;
    const respuesta = await conexion.query(`INSERT INTO preregistro 
    (accounts_id, tienda_id, token, cliente, cedula, direccion, telefono, movil, email, notas, fecha_instalacion, estado_aprobado) 
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`, 
    [accounts_id, tienda_id, token, cliente, cedula, direccion, telefono, movil, email, notas, fecha_instalacion, estado_aprobado])
    if (!respuesta) {
        reply.code(500).send({
            success: false,
            message: "Error al guardar el registro"
        });
    } else {
        await axios.post('https://demo.mikrosystem.net/api/v1/NewPreRegistro', {
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
        reply.code(200).send({
            success: true,
            message: "Registro guardado",
            tienda_id: respuesta[0].insertId
        });
    }
}
export const PreregistroAprobar = async (req, reply) => {
    const { tienda_id } = req.body;
    let fecha_aprobado = moment().format("YYYY-MM-DD HH:mm:ss");
    const respuesta = await conexion.query(`UPDATE preregistro SET estado_aprobado = true, fecha_aprobado = ? WHERE tienda_id = ?`,
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
            tienda_id: respuesta[0].insertId
        });
    }
}