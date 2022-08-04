import { conexion } from "../database/conexion";

export const ListBanks = async (req, reply) => {
    try {
        const banks = await conexion.query(`SELECT * FROM bancos`);
        if (!banks) {
            reply.code(500).send({
                success: false,
                message: "Error al listar los bancos"
            });
        }else{
            reply.code(200).send({
                success: true,
                data: banks[0]
            });
        }
    } catch (error) {
        throw new Error("ListBanks-->  "+error);
    }
}

export const ListWays = async (req, reply) => {
    try {
        const ways = await conexion.query(`SELECT * FROM formapago`);
        if (!ways) {
            reply.code(500).send({
                success: false,
                message: "Error al listar los ways"
            });
        }else{
            reply.code(200).send({
                success: true,
                data: ways[0]
            });
        }
    } catch (error) {
        throw new Error("ListWays-->  "+error);
    }
}