import { conexion } from "../database/conexion";
import { comparePassword } from "../function/bcrypt";
import jwt from "jsonwebtoken";

export const LoginAdmin = async (req, reply) => {
    const { username, password } = req.body;
    const response = await conexion.query(`SELECT 
    accounts.host, accounts.token, accounts.host_whatsapp, accounts.accounts,accounts.fecha,
    usuarios_admin.id,usuarios_admin.accounts_id, usuarios_admin.username, usuarios_admin.password,
    usuarios_admin.role 
    FROM accounts 
    INNER JOIN usuarios_admin  ON usuarios_admin.accounts_id = accounts.id
    WHERE username = ?`, [username]);
    console.log(response[0])
    if (response[0].length == 0) {
        reply.code(500).send({
            success: false,
            message: "Error al iniciar sesion"
        });
    } else {
        const x = await comparePassword(password, response[0][0].password)
        if (x) {
            delete response[0][0].password
            var token = jwt.sign(response[0][0], 'speed', { expiresIn: '1h'});
            reply.send({
                success: true,
                data:token
            });
        }else{
            reply.send({
                success: false,
                message: "Error al iniciar sesion"
            });
        }
    }
}


export const LoginTienda = async (req, reply) => {
    const { username, password } = req.body;
    const response = await conexion.query(`SELECT 
    tienderos_usuarios.id, tienderos_usuarios.accounts_id, 
    tienderos_usuarios.nombre_tienda, tienderos_usuarios.responsable,
    tienderos_usuarios.cedula, tienderos_usuarios.comision, tienderos_usuarios.token_sistema, tienderos_usuarios.password,
    tienderos_usuarios.usuario, accounts.host, accounts.token
    FROM tienderos_usuarios 
    INNER JOIN accounts ON tienderos_usuarios.accounts_id = accounts.id
    WHERE usuario = ?`, [username]);
    if (response[0].length == 0) {
        reply.code(500).send({
            success: false,
            message: "Error al iniciar sesion"
        });
    } else {
        const x = await comparePassword(password, response[0][0].password)
        console.log(x)
        console.log("\n")
        if (x) {
            delete response[0][0].password
            if (response[0][0].token_sistema.length > 0) {
                var token = jwt.sign(response[0][0], 'speed', { expiresIn: '1h'});
                reply.send({
                    success: true,
                    data: token
                });
            }else{
                reply.send({
                    success: false,
                    message: "No tiene token asignado"
                });
            }
        }else{
            reply.send({
                success: false,
                message: "Calve o usuario incorrecto"
            });
        }
    }
}