import { conexion } from "../database/conexion";

export const estadoAccounts = async (accounts_id) => {
    try {
        const accounts = await conexion.query(`SELECT * FROM accounts WHERE id = ? AND enable = 0`, [accounts_id]);
           return !accounts ? false : true;
    } catch (error) {
        throw new Error("estadoAccounts-->"+ error)
    }
}