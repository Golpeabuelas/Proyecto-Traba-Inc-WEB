import { Router } from "express";
import connection from "../../connection_sql.js";

const postLoader = Router()

postLoader.post('/readOwnPosts', (req, res) => {
    const id_usuario = req.body.id_usuario
    
    const respuesta = {
        informacion_Publicacion: [],
        informacion_Mascota: [],
        informacion_Desaparicion: []
    }

    connection.query('SELECT * FROM publicacion WHERE id_usuario = ?', [id_usuario], async (error, response) => {
        if ( error ) {
            return res.send(console.log('No pudimos traer tus publicaciones'));
        }

        if ( response.length === 0 ) {
            return res.send(console.log('No tienes publicaciones'));
        }

        for(let i = 0; i < response.length; i++) {
            const informacionPublicacion = response[i]
            const id_publicacion = response[i].id_publicacion

            try {
                const [informacionMascota, informacionDesaparicion] = await Promise.all([
                    new Promise((resolve, reject) => {
                        connection.query('SELECT * FROM informacion_mascota WHERE id_publicacion = ?', [id_publicacion], (errorIM, responseIM) => {
                            if ( errorIM ) {
                                return reject(console.log('No pudimos traer esa información de desaparición'))
                            }

                            if ( responseIM.length === 0 ) {
                                return reject(console.log('No tienes publicaciones'));
                            }

                            resolve(responseIM[0]);
                        })
                    }), 

                    new Promise((resolve, reject) => {
                        connection.query('SELECT * FROM informacion_desaparicion WHERE id_publicacion = ?', [id_publicacion], (errorID, responseID) => {
                            if ( errorID ) {
                                return reject('No pudimos traer esa información de desaparición')
                            }
                            if ( responseID.length === 0 ) {
                                return reject('No tienes publicaciones')
                            }

                            resolve(responseID[0]);
                        });
                    })
                ])
                
            
                respuesta.informacion_Publicacion.push(informacionPublicacion)
                respuesta.informacion_Mascota.push(informacionMascota)
                respuesta.informacion_Desaparicion.push(informacionDesaparicion)
            } catch (error) {
                console.log('No pudimos traer la información de tu publicación', error)
            }
        }
        
        return res.json(respuesta)
    })
});

postLoader.post('/readOtherPosts', (req, res) => {
    const id_usuario = req.body.id_usuario

    const respuesta = {
        informacion_Publicacion: [],
        informacion_Mascota: [],
        informacion_Desaparicion: []
    }

    connection.query('SELECT * FROM publicacion WHERE id_usuario <> ?', [id_usuario], async (error, response) => {
        if ( error ) {
            return res.send(console.log('No pudimos traer tus publicaciones'));
        }

        if ( response.length === 0 ) {
            return res.send(console.log('No tienes publicaciones'));
        }

        for(let i = 0; i < response.length; i++) {
            const informacionPublicacion = response[i]
            const id_publicacion = response[i].id_publicacion

            try {
                const [informacionMascota, informacionDesaparicion] = await Promise.all([
                    new Promise((resolve, reject) => {
                        connection.query('SELECT * FROM informacion_mascota WHERE id_publicacion = ?', [id_publicacion], (errorIM, responseIM) => {
                            if ( errorIM ) {
                                return reject(console.log('No pudimos traer esa información de desaparición'))
                            }

                            if ( responseIM.length === 0 ) {
                                return reject(console.log('No tienes publicaciones'))
                            }

                            resolve(responseIM[0]);
                        })
                    }), 

                    new Promise((resolve, reject) => {
                        connection.query('SELECT * FROM informacion_desaparicion WHERE id_publicacion = ?', [id_publicacion], (errorID, responseID) => {
                            if ( errorID ) {
                                return reject('No pudimos traer esa información de desaparición');
                            }
                            if ( responseID.length === 0 ) {
                                return reject('No tienes publicaciones');
                            }

                            resolve(responseID[0]);
                        });
                    })
                ])
                
            
                respuesta.informacion_Publicacion.push(informacionPublicacion)
                respuesta.informacion_Mascota.push(informacionMascota)
                respuesta.informacion_Desaparicion.push(informacionDesaparicion)


            } catch (e) {
                console.log('No pudimos traer la información de tu publicación', e)
            }
        }

        return res.json(respuesta)
    })
});

postLoader.post('/readAPost', async (req, res) => {
    const id_publicacion = req.body.id_publicacion

    const response = {
        informacion_publicacion: '',
        informacion_mascota: '',
        informacion_desaparicion: '',
        ubicacion_desaparicion: ''
    }

    try {
        const [informacionPublicacion, informacionMascota, informacionDesaparicion, ubicacionDesaparicion] = await Promise.all([
            new Promise((resolve, reject) => {
                connection.query('SELECT * FROM publicacion WHERE id_publicacion = ?', [id_publicacion], (errorIP, responseIP) => {
                    if ( errorIP ) {
                        reject(res.status(400).send(console.log('No pudimos traer tu publicación')))
                    }

                    if ( responseIP.length === 0 ) {
                        reject(res.status(404).send(console.log('Publicación no encontrada')))
                    }

                    resolve(responseIP[0])
                })
            }),
            
            new Promise((resolve, reject) => {
                connection.query('SELECT * FROM informacion_mascota WHERE id_publicacion = ?', [id_publicacion], (errorIM, responseIM) => {
                    if ( errorIM ) {
                        reject(res.status(400).send(console.log('No pudimos traer la informacion')));
                    }

                    if ( response.length === 0 ) {
                        reject(res.status(400).send(console.log('No tienes publicaciones')));
                    }

                    resolve(responseIM[0]);
                })
            }), 

            new Promise((resolve, reject) => {
                connection.query('SELECT * FROM informacion_desaparicion WHERE id_publicacion = ?', [id_publicacion], (errorID, responseID) => {
                    if ( errorID ) {
                        return reject('No pudimos traer esa información de desaparición');
                    } 
                    if ( responseID.length === 0 ) {
                        return reject('No tienes publicaciones');
                    }

                    resolve(responseID[0]);
                });
            }),

            new Promise((resolve, reject) => {
                connection.query('SELECT * FROM ubicacion_desaparicion WHERE id_publicacion = ?', [id_publicacion], (errorUD, responseUD) => {
                    if ( errorUD ) {
                        return reject('No pudimos traer esa información de desaparición');
                    } 
                    if ( responseUD.length === 0 ) {
                        return reject('No tienes publicaciones');
                    }

                    resolve(responseUD[0]);
                });

            })
        ])
        
        response.informacion_publicacion = informacionPublicacion
        response.informacion_mascota = informacionMascota
        response.informacion_desaparicion = informacionDesaparicion
        response.ubicacion_desaparicion = ubicacionDesaparicion

    } catch (error) {
        console.log('No pudimos traer la información de tu publicación')
    }

    res.json(response)
})

export default postLoader