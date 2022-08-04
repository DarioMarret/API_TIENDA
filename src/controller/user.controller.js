
import moment from "moment";
import { conexion } from "../database/conexion";
import { hashPassword } from "../function/bcrypt";
import { estadoAccounts } from "../function/estadoAccounts";
import { ValidarRole } from "../function/validarRole";

moment.locale("es");

export const SaveUser = async (req, reply) => {
    const { username, password, role, accounts_id } = req.body;
    try {
        let hash = await hashPassword(password);
        const user = await conexion.query(`INSERT INTO usuarios_admin (username, password, role, accounts_id, fecha_registros) VALUES (?, ?, ?, ?, ? )`, [username, hash, role, accounts_id, moment().format("YYYY-MM-DD HH:mm:ss")]);
        if (!user) {
            reply.code(500).send({
                success: false,
                message: "Error al guardar el usuario"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "Usuario guardado"
            });
        }
    } catch (error) {
        throw new Error("SaveUser-->  " + error);
    }
}


export const ListUsers = async (req, reply) => {
    try {
        const {role, accounts_id} = await ValidarRole(req.params.id);
        const estadoA = await estadoAccounts(accounts_id);
        if (role == "administrador" && estadoA == true) {
            const users = await conexion.query(`SELECT usuarios_admin.id, usuarios_admin.username, usuarios_admin.role, accounts.accounts, usuarios_admin.fecha_registros
            FROM usuarios_admin INNER JOIN accounts ON accounts.id = usuarios_admin.accounts_id WHERE accounts_id = ?`, [accounts_id]);
            if (!users) {
                reply.code(500).send({
                    success: false,
                    message: "Error al listar los usuarios"
                });
            } else {
                reply.code(200).send({
                    success: true,
                    message: "Usuarios listados",
                    users: users[0]
                });
            }
        } else if (role == "super_admin" && estadoA == true) {
            const users = await conexion.query(`SELECT usuarios_admin.id, usuarios_admin.username, usuarios_admin.role, accounts.accounts, usuarios_admin.fecha_registros
            FROM usuarios_admin INNER JOIN accounts ON accounts.id = usuarios_admin.accounts_id WHERE accounts.enable = 0`);
            if (!users) {
                reply.code(500).send({
                    success: false,
                    message: "Error al listar los usuarios"
                });
            } else {
                reply.code(200).send({
                    success: true,
                    message: "Usuarios listados",
                    users: users[0]
                });
            }
        }else{
            reply.code(500).send({
                success: false,
                message: "cuenta deshabilitada consulte con su developer"
            });
        }
    } catch (error) {
        throw new Error("ListUsers-->  " + error);
    }
}

export const updateUser = async (req, reply) => {
    const { username, password, role } = req.body;
    try {
        const user = await conexion.query(`UPDATE usuarios_admin SET username = ?, password = ?, role = ? WHERE id = ?`, [username, password, role, req.params.id]);
        if (!user) {
            reply.code(500).send({
                success: false,
                message: "Error al actualizar el usuario"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "Usuario actualizado"
            });
        }
    } catch (error) {
        throw new Error("updateUser-->  " + error);
    }
}

export const deleteUser = async (req, reply) => {
    try {
        const user = await conexion.query(`DELETE FROM usuarios_admin WHERE id = ?`, [req.params.id]);
        if (!user) {
            reply.code(500).send({
                success: false,
                message: "Error al eliminar el usuario"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "Usuario eliminado"
            });
        }
    } catch (error) {
        throw new Error("deleteUser-->  " + error);
    }
}

export const AsignarAccount = async (req, reply) => {
    const { accounts_id } = req.body;
    try {
        const user = await conexion.query(`UPDATE usuarios_admin SET accounts_id = ?  WHERE id = ?`, [accounts_id, req.params.id]);
        if (!user) {
            reply.code(500).send({
                success: false,
                message: "Error al asignar la cuenta"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "Cuenta asignada"
            });
        }
    } catch (error) {
        throw new Error("AsignarAccount-->  " + error);
    }
}

export const resetPassword = async (req, reply) => {
    const { password } = req.body;
    const hash = await hashPassword(password);
    try {
        const user = await conexion.query(`UPDATE usuarios_admin SET password = ?  WHERE id = ?`, [hash, req.params.id]);
        if (!user) {
            reply.code(500).send({
                success: false,
                message: "Error al resetear la contraseña"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "Contraseña reseteada"
            });
        }
    } catch (error) {
        throw new Error("resetPassword-->  " + error);
    }
}

export const resetAccount = async (req, reply) => {
    try {
        const { accounts_id } = req.body;
        const user = await conexion.query(`UPDATE usuarios_admin SET accounts_id = ?  WHERE id = ?`, [accounts_id, req.params.id]);
        if (!user) {
            reply.code(500).send({
                success: false,
                message: "Error al resetear la cuenta"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "Cuenta reseteada"
            });
        }
    } catch (error) {
        throw new Error("resetAccount-->  " + error);
    }
}