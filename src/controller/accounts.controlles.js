import { conexion } from "../database/conexion";
import moment from "moment";
import { ValidarRole } from "../function/validarRole";

moment.locale("es");

export const SaveAccount = async (req, reply) => {
    try {
        const { accounts, host, token } = req.body;
        let enabled = 0
        let fecha = moment().format("YYYY-MM-DD HH:mm:ss")
        const response = await conexion.query(`INSERT INTO accounts (accounts, host, token, enable, fecha) VALUES (?, ?, ?, ?, ?) `, 
        [accounts, host, token, enabled, fecha]);
        if (!response) {
            reply.code(500).send({
                success: false,
                message: "Error al guardar la cuenta"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: "Cuenta guardada"
            });
        }
    } catch (error) {
        throw new Error("SaveAccount-->  " + error);
    }
}

export const ListAccounts = async (req, reply) => {
    const { role, accounts_id } = await ValidarRole(req.params.id);
    // console.log(await estadoAccounts(accounts_id));
    if (role == "administrador") {
        const accounts = await conexion.query(`SELECT * FROM accounts WHERE id = ? AND enable = 0`, [accounts_id]);
        console.log("accounts",accounts[0])
        if (!accounts) {
            reply.code(500).send({
                success: false,
                message: "Error al listar las cuentas"
            });
        } else {
            reply.code(200).send({
                success: true,
                message: accounts[0].length > 0 ? "Cuentas listadas" : "cuenta deshabilitada consulte con su developer",
                data: accounts[0]
            });
        }
    } else if (role == "super_admin") {
        const accounts = await conexion.query(`SELECT * FROM accounts WHERE enable = 0`);
        if (!accounts) {
            reply.code(500).send({
                success: false,
                message: "Error al listar las cuentas"
            });
        }
        else {
            reply.code(200).send({
                success: true,
                message: "Cuentas listadas",
                data: accounts[0]
            });
        }
    }
}


export const updateAccount = async (req, reply) => {
    const { accounts } = req.body;
    const response = await conexion.query(`UPDATE accounts SET accounts = ?  WHERE id = ?`, [accounts, req.params.id]);
    if (!response) {
        reply.code(500).send({
            success: false,
        });
    } else {
        reply.code(200).send({
            success: true,
            data: response
        });
    }
}

export const deleteAccount = async (req, reply) => {
    const { enable, accounts_id } = req.params;
    const response = await conexion.query(`UPDATE accounts SET enable = ? WHERE id = ?`, [enable, accounts_id]);
    console.log("response", response)
    if (response[0].affectedRows > 0) {
        reply.code(200).send({
            success: true,
            data: "Delete account"
        });
    } else {
        reply.code(500).send({
            success: false,
        });
    }
}