import { conexion } from "../database/conexion";
import { ValidarRole } from "../function/validarRole";

export const ListRoles = async (req, reply) => {
    try {
        const {role, accounts_id} = await ValidarRole(req.params.id);

        const roles = await conexion.query(`SELECT * FROM roles`);
        if (!roles) {
            reply.code(500).send({
                success: false,
                message: "Error al listar los roles"
            });
        }else{
            reply.code(200).send({
                success: true,
                message: "Roles listados",
                data: role == "administrador" ? roles[0].filter(rol => rol.role != "super_admin") : roles[0]
            });
        }
    } catch (error) {
        throw new Error("ListRoles-->  "+error);
    }
}

export const SaveRoles = async (req, reply) => {
    const { role } = req.body;
    try {
        const roles = await conexion.query(`INSERT INTO roles (role) VALUES (?)`, [role]);
        if (!roles) {
            reply.code(500).send({
                success: false,
                message: "Error al guardar el rol"
            });
        }else{
            reply.code(200).send({
                success: true,
                message: "Rol guardado"
            });
        }
    } catch (error) {
        throw new Error("SaveRoles-->  "+error);
    }
}

export const updateRoles = async (req, reply) => {
    const { role } = req.body;
    try {
        const roles = await conexion.query(`UPDATE roles SET role = ? WHERE id = ?`, [role, req.params.id]);
        if (!roles) {
            reply.code(500).send({
                success: false,
                message: "Error al actualizar el rol"
            });
        }else{
            reply.code(200).send({
                success: true,
                message: "Rol actualizado"
            });
        }
    } catch (error) {
        throw new Error("updateRoles-->  "+error);
    }
}
export const deleteRoles = async (req, reply) => {
    try {
        const roles = await conexion.query(`DELETE FROM roles WHERE id = ?`, [req.params.id]);
        if (!roles) {
            reply.code(500).send({
                success: false,
                message: "Error al eliminar el rol"
            });
        }else{
            reply.code(200).send({
                success: true,
                message: "Rol eliminado"
            });
        }
    } catch (error) {
        throw new Error("deleteRoles-->  "+error);
    }
}