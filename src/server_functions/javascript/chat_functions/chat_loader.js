import { Router } from "express";
import connection from "../../connection_sql.js";

const chatLoader = Router()

chatLoader.post('/verificarExistenciaChat', async (req, res) => {
    const id_usuario_reader = req.body.id_usuario_reader
    const id_usuario_owner = req.body.id_usuario_owner
    const id_publicacion = req.body.id_publicacion

    let pasa = true
    let indice = null

    try {
        const response = await connection.execute('SELECT * FROM chat_publicacion WHERE id_publicacion = ?', [id_publicacion])

        for (let i = 0; i < response.rows.length; i++) {
            const Response = await connection.execute('SELECT * FROM usuario_chat_publicacion WHERE id_chat = ?', [response.rows[i].id_chat])
           
            if ( Response.rows.length > 0) {
                if ( ((id_usuario_owner === Response.rows[0].id_usuario) && (id_usuario_reader === Response.rows[1].id_usuario)) || ((id_usuario_owner === Response.rows[1].id_usuario) && (id_usuario_reader === Response.rows[0].id_usuario)) ) {
                    pasa = false
                    indice = i
                    break
                }
            }
        }

        if ( pasa === true ) {
            return res.json({ existe: false })
        } else {
            return res.json({ existe: true, id_chat: response.rows[indice].id_chat })
        }

    } catch (error) {
        return res.send(console.log('No pudimos traer la información', error))
    }
})

chatLoader.post('/verificarChat', async (req, res) => {
    const id_owner = req.body.id_owner 
    const id_reader = req.body.id_reader
    const id_chat = req.body.id_chat

    try {
        const Response = await connection.execute('SELECT * FROM usuario_chat_publicacion WHERE id_chat = ?', [id_chat])

        if ( ((id_owner === Response.rows[0].id_usuario) && (id_reader === Response.rows[1].id_usuario)) || ((id_owner === Response.rows[1].id_usuario) && (id_reader === Response.rows[0].id_usuario)) ) {
            return res.json({ existe: true })
        } else {
            return res.json({ existe: false })
        }
    } catch (error) {
        return res.send(console.log('Error al traer los usuarios participantes'))
    }
})

chatLoader.post('/crearChat', async (req, res) => {
    const id_publicacion = req.body.id_publicacion

    try {
        const response = await connection.execute('INSERT INTO chat_publicacion (id_publicacion) VALUES (?)', [id_publicacion])

        return res.json({ id_chat: parseInt(response.lastInsertRowid) })
    } catch (error) {
        return res.send(console.log('No hemos podido comunicarnos con este usuario, intente más tarde', error))
    }
})

chatLoader.post('/relacionarUsuarios', async (req, res) => {
    const id_usuario = req.body.id_usuario
    const id_chat = req.body.id_chat

    try {
        await connection.execute('INSERT INTO usuario_chat_publicacion (id_usuario, id_chat) VALUES (?, ?)', [id_usuario, id_chat])

        return res.send(console.log('Usuarios relacionados exitosamente'))
    } catch (error) {
        return res.send(console.log('No pudimos hacer la relación', error))
    }
})

chatLoader.post('/obtenerChatsPublicacion', async (req, res) => {
    const id_publicacion = req.body.id_publicacion

    try {
        const response = await connection.execute('SELECT * FROM chat_publicacion WHERE id_publicacion = ?', [id_publicacion])

        return res.json(response.rows)
    } catch (error) {
        return res.send(console.log('No pudimos traerte los chats'))
    }
})

chatLoader.post('/obtenerParticipantesChat', async (req, res) => {
    const id_usuario = req.body.id_usuario
    const id_chat = req.body.id_chat

    try {
        const response = await connection.execute('SELECT * FROM usuario_chat_publicacion WHERE id_chat = ?', [id_chat])

        console.log(response)
        if ( response.rows[0].id_usuario === id_usuario ) {
            return res.json({ id_reader: response.rows[1].id_usuario })
        } else if ( response.rows[1].id_usuario === id_usuario ) {
            return res.json({ id_reader: response.rows[0].id_usuario })
        }
    } catch (error) {
        return res.send(console.log('Error al encontrar los participantes del chat', error))
    }
})

export default chatLoader