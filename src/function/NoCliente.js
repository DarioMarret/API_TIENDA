import axios from 'axios'


export const NoCliente = async (cedula, host, token, reply) => {
    const response = await axios.post(`${host}/ListInstall`, { "token": token, cedula })
    console.log(response.data)
    console.log("\n")
    try {
        if (response.data.estado == 'error') {
            const { data } = await axios.get(`${endpoitcedula}` + cedula)
            if (data.message == 'Servicio de validación de cédulas de identidad no disponible') {
                //caso de que el usuario aya dijitado mal el numero de cedula o no exista en la base de datos del registro civil
                reply.send({
                    success: false,
                    msg: message.cedula_invalida,
                })
            } else {
                reply.send({
                    success: true,
                    msg: `Estimado ${data.message.name} no encontramos registro en nuestra base de datos`,
                })
            }
        } else if (response.data.instalaciones[0].estate == "NO INSTALADO") {
            reply.send({
                success: true,
                msg: `usuario  ${response.data.instalaciones[0].cliente} no instaldo o retirado`,
            })
        } else if (response.data.instalaciones[0].estate == "PENDIENTE") {
            reply.send({
                success: true,
                msg: `Estimado cliente ${response.data.instalaciones[0].cliente} usted ya cuenta con una instalacion *Pendiente*`,
            })
        }
    } catch (error) {
        reply.send({
            success: true,
            msg: `No encontramos registro en nuestra base de datos`,
        })       
    }
}