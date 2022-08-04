import { conexion } from "../database/conexion";

/**
 * 
 * @param {*} id 
 * @returns { Promise<{role: string, accounts_id: number}> }
 */
export const ValidarRole = async (id) => {
    try {
        const user = await conexion.query(`SELECT role, accounts_id FROM usuarios_admin WHERE id = ?`, [id]);
        if (!user) {
            return false;
        } else {
            return {
                role: user[0][0].role,
                accounts_id: user[0][0].accounts_id,
            };
        }
    } catch (error) {
        throw new Error("ValidarRole-->  " + error);
    }
}

