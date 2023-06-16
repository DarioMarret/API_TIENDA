import axios from "axios"
import { conexion } from "../database/conexion"

export const ConPre = async () => {
    let estado = "PENDIENTE"
    const respuesta = await conexion.query(`SELECT * FROM preregistros WHERE estado_aprobado = '${estado}'`)
    respuesta[0].forEach(async (element) => {
        await VerificarEstado(element.token, element.estado_aprobado, element.cedula)
    })
}

async function VerificarEstado(token, estado, cedula) {
    const { data, status } = await axios.post("http://45.224.96.50/api/v1/ListInstall",
        {
            "token": token,
            "estado": estado,
            "cedula": cedula

        })
    if (status === 200) {
        if (data.estado !== "error") {
            let estado = data.instalaciones[0].estate
            await conexion.query(`UPDATE preregistros SET estado_aprobado = '${estado}' WHERE cedula = '${cedula}'`)
        }
    }
}