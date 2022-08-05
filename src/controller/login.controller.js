import { conexion } from "../database/conexion";
import { comparePassword } from "../function/bcrypt";
import jwt from "jsonwebtoken";

export const LoginAdmin = async (req, reply) => {
    const { username, password } = req.body;
    const response = await conexion.query(`SELECT * FROM usuarios_admin WHERE username = ?`, [username]);
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
    const response = await conexion.query(`SELECT * FROM tienderos_usuarios WHERE usuario = ?`, [username]);
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