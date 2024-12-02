import { Router } from "express";
import connection from "../../connection_sql.js";

const chatLoader = Router()

chatLoader.post('/verificarChat', async (req, res) => {
    const id_usuario_reader = req.body.id_usuario_reader
    const id_usuario_owner = req.body.id_usuario_owner
    const id_publicacion = req.body.id_publicacion

    connection.query('SELECT * FROM chat_publicacion WHERE id_publicacion = ?', [id_publicacion], async (error, response) => {
        if ( error ) {
            return res.status(400).send(console.log('No pudimos traer la información'))
        }

        if ( response.length === 0 ) {
            return res.status(404).send(console.log('Chats no encontrados'))
        }

        for (let i = 0; i < response.length; i++) {
            
            try {
                const [idUsuarioReader, idUsuarioOwner] = await Promise.all ([
                    new Promise((resolve, reject) => {
                        connection.query('SELECT * FROM usuario_chat_publicacion WHERE id_chat = ?', [response[i].id_chat], (errorR, responseR) => {
                            if ( error ) {
                                return reject(res.send(console.log('No pudimos traer la información')))
                            }
            
                            if ( response.length === 0 ) {
                                resolve(0)
                            }
            
                            resolve(response[1])
                        })
                    }),

                    new Promise((resolve, reject) => {
                        connection.query('SELECT * FROM usuario_chat_publicacion WHERE id_chat = ?', [response[i].id_chat], (errorR, responseR) => {
                            if ( error ) {
                                return reject(res.send(console.log('No pudimos traer la información')))
                            }
            
                            if ( response.length === 0 ) {
                                resolve(0)
                            }
            
                            resolve(response[0])
                        })
                    }),

                ])
            } catch (e) {
                console.log('Error al traer toda la información')
            }
            
            
            
            
        }
    }) 

    return res.json({ crear: true })
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

        return res.send(console.log('Falló exitosamente'))
    })
})

export default chatLoader