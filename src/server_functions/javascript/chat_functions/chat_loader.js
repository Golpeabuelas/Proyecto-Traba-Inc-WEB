import { Router } from "express";
import connection from "../../connection_sql.js";

const chatLoader = Router()

chatLoader.post('/verificarExistenciaChat', (req, res) => {
    const id_usuario_reader = req.body.id_usuario_reader
    const id_usuario_owner = req.body.id_usuario_owner
    const id_publicacion = req.body.id_publicacion

    let pasa = true
    let indice = null
    connection.query('SELECT * FROM chat_publicacion WHERE id_publicacion = ?', [id_publicacion], async (error, response) => {
        if ( error ) {
            return res.status(400).send(console.log('No pudimos traer la información'))
        }

        for (let i = 0; i < response.length; i++) {
            const Response = await new Promise ((resolve, reject) => {
                connection.query('SELECT * FROM usuario_chat_publicacion WHERE id_chat = ?', [response[i].id_chat], (errorC, responseC) => {
                    if ( errorC ) {
                        reject(console.log('Error al traer la información'))
                    }

                    if ( responseC.length === 0 ) {
                        resolve(0)
                    }

                    resolve(responseC)
                })
            }) 
            
            if ( ((id_usuario_owner === Response[0].id_usuario) && (id_usuario_reader === Response[1].id_usuario)) || ((id_usuario_owner === Response[1].id_usuario) && (id_usuario_reader === Response[0].id_usuario)) ) {
                pasa = false
                indice = i
                break
            }
        }

        if ( pasa === true ) {
            return res.json({ existe: false })
        } else {
            return res.json({ existe: true, id_chat: response[indice].id_chat })
        }
    }) 
})

chatLoader.post('/verificarChat', (req, res) => {
    const id_owner = req.body.id_owner 
    const id_reader = req.body.id_reader
    const id_chat = req.body.id_chat

    connection.query('SELECT * FROM usuario_chat_publicacion WHERE id_chat = ?', [id_chat], (error, response) => {
        if ( error ) {
            return res.send(console.log('Error al traer los usuarios participantes'))
        }

        if ( ((id_owner === response[0].id_usuario) && (id_reader === response[1].id_usuario)) || ((id_owner === response[1].id_usuario) && (id_reader === response[0].id_usuario)) ) {
            return res.json({ existe: true })
        } else {
            return res.json({ existe: false })
        }
    })
})

chatLoader.post('/crearChat', (req, res) => {
    const id_publicacion = req.body.id_publicacion

    connection.query('INSERT INTO chat_publicacion (id_publicacion) VALUES (?)', [id_publicacion], (error, response) => {
        if ( error ) {
           return res.status(400).send(console.log('No hemos podido comunicarnos con este usuario, intente más tarde', error))
        }

        return res.json({ id_chat: response.insertId })
    })
})

chatLoader.post('/relacionarUsuarios', (req, res) => {
    const id_usuario = req.body.id_usuario
    const id_chat = req.body.id_chat

    connection.query('INSERT INTO usuario_chat_publicacion (id_usuario, id_chat) VALUES (?, ?)', [id_usuario, id_chat], (error, response) => {
        if ( error ) {
            return res.send(console.log('No pudimos hacer la relación', error))
        }
    })
})

chatLoader.post('/obtenerChatsPublicacion', (req, res) => {
    const id_publicacion = req.body.id_publicacion

    connection.query('SELECT * FROM chat_publicacion WHERE id_publicacion = ?', [id_publicacion], (error, response) => {
        if ( error ) {
            return res.send(console.log('No pudimos traerte los chats'))
        }

        res.json(response)
    })
})

chatLoader.post('/obtenerParticipantesChat', (req, res) => {
    const id_usuario = req.body.id_usuario
    const id_chat = req.body.id_chat

    connection.query('SELECT * FROM usuario_chat_publicacion WHERE id_chat = ?', [id_chat], (error, response) => {
        if ( error ) {
            return res.send(console.log('Error al encontrar los participantes del chat'))
        }

        if ( response[0].id_usuario === id_usuario ) {
            return res.json({ id_reader: response[1].id_usuario })
        } else if ( response[1].id_usuario === id_usuario ) {
            return res.json({ id_reader: response[0].id_usuario })
        }
    })
})

export default chatLoader