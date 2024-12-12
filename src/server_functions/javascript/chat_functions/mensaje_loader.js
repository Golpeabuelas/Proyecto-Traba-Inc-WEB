import { Router } from "express";
import connection from "../../connection_sql.js";

const mensajeLoader = Router()

mensajeLoader.post('/crearMensaje', async (req, res) => {
    const id_usuario = req.body.id_usuario
    const id_chat = req.body.id_chat
    const mensaje = req.body.mensaje

    console.log(id_chat, id_usuario, mensaje)

    try {
        await connection.execute('INSERT INTO mensaje_chat (id_chat, id_usuario, mensaje) VALUES (?, ?, ?)', [id_chat, id_usuario, mensaje])

        return res.send(console.log('Mensaje Creado'))
    } catch (error) {
        return res.send(console.log('No pudimos enviar tu mensaje', error))
    }
})

mensajeLoader.post('/cargarMensajes', async (req, res) => {
    const id_usuario_owner = req.body.id_usuario_owner_post
    const id_usuario_reader = req.body.id_usuario_reader_post
    const id_chat = req.body.id_chat
    
    const mensaje = {
        mensaje: [],
        reader: []
    }

    try {
        const response = await connection.execute('SELECT * FROM mensaje_chat WHERE id_chat = ?', [id_chat])

        for (let i = 0; i < response.rows.length; i++) {
            if ( response.rows[i].id_usuario === id_usuario_owner ) {
                mensaje.mensaje.push({ Mensaje: response.rows[i].mensaje })
                mensaje.reader.push({ Propietario: true })
            }

            if ( response.rows[i].id_usuario === id_usuario_reader ) {
                mensaje.mensaje.push({ Mensaje: response.rows[i].mensaje })
                mensaje.reader.push({ Propietario: false })
            }
        }

        return res.json(mensaje)
    } catch (error) {
        return res.send(console.log('Error al cargar el chat', error))
    }
   
})

export default mensajeLoader