import { Router } from "express";
import connection from "../../connection_sql.js";

const mensajeLoader = Router()

mensajeLoader.post('/crearMensaje', (req, res) => {
    const id_usuario = req.body.id_usuario
    const id_chat = req.body.id_chat
    const mensaje = req.body.mensaje

    connection.query('INSERT INTO mensaje_chat (id_chat, id_usuario, mensaje) VALUES (?, ?, ?)', [id_chat, id_usuario, mensaje], (error, response) => {
        if ( error ) {
            return res.status(400).send(console.log('No pudimos enviar tu mensaje'))
        }

        res.send(console.log('acaba w'))
    })
})

mensajeLoader.post('/cargarMensajes', (req, res) => {
    const id_usuario_owner = req.body.id_usuario_owner_post
    const id_usuario_reader = req.body.id_usuario_reader_post
    const id_chat = req.body.id_chat
    
    const mensaje = {
        mensaje: [],
        reader: []
    }

    connection.query('SELECT * FROM mensaje_chat WHERE id_chat = ?', [id_chat], (error, response) => {
        if ( error )  {
            res.status(400).send(console.log('Error al cargar el chat', error))
        }

        for (let i = 0; i < response.length; i++) {
            if ( response[i].id_usuario === id_usuario_owner ) {
                mensaje.mensaje.push({ Mensaje: response[i].mensaje })
                mensaje.reader.push({ Propietario: false })
            }

            if ( response[i].id_usuario === id_usuario_reader ) {
                mensaje.mensaje.push({ Mensaje: response[i].mensaje })
                mensaje.reader.push({ Propietario: true })
            }
        }

        return res.json(mensaje)
    })
})

export default mensajeLoader