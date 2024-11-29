import { Router } from "express";
import connection from "../../connection_sql.js";

const publicaciones = Router()

publicaciones.post('/crearPublicacion', (req, res) => {
    const id_usuario = req.body.id_usuario
    const titulo_publicacion = req.body.titulo_publicacion
    const imagen_mascota = req.body.imagen_mascota
    const nombre_mascota = req.body. nombre_mascota
    const especie_mascota = req.body.especie_mascota
    const color_mascota = req.body.color_mascota
    const distintivo_mascota = req.body.distintivo_mascota
    const fecha_desaparicion = req.body.fecha_desaparicion
    const descripcion_desaparicion = req.body.descripcion_desaparicion
    const latitud = req.body.latitud
    const longitud = req.body.longitud

    connection.query('INSERT INTO publicacion (id_usuario, titulo_publicacion) VALUES (?, ?)', [id_usuario, titulo_publicacion], (errorP, responseP) => {
        if ( errorP ) {
            res.status(400).send(console.log('Error al crear tu publicación', errorP))
        }

        const id_publicacion = responseP.insertId

        connection.query('INSERT INTO informacion_mascota (id_publicacion, imagen_mascota, nombre_mascota, especie_mascota, color_mascota, distintivo_mascota) VALUES (?, ?, ?, ?, ?, ?)', [id_publicacion, imagen_mascota, nombre_mascota, especie_mascota, color_mascota, distintivo_mascota], (errorIM, responseIM) => {
            if ( errorIM ) {
                res.status(400).send(console.log('Error al crear tu publicación', errorIM))
            }
        })

        connection.query('INSERT INTO informacion_desaparicion (id_publicacion, fecha_desaparicion, descripcion_desaparicion, estatus_desaparicion) VALUES (?, ?, ?, ?)', [id_publicacion, fecha_desaparicion, descripcion_desaparicion, true], (errorID, responseID) => {
            if ( errorID ) {
                res.status(400).send(console.log('Error al crear tu publicación', errorID))
            }
        })

        connection.query('INSERT INTO ubicacion_desaparicion (id_publicacion, latitud, longitud) VALUES (?, ?, ?)', [id_publicacion, latitud, longitud], (errorU, responseU) => {
            if ( errorU ) {
                res.status(400).send(console.log('Error al crear tu publicación', errorID))
            }
        })

        res.send('Todo bien apá')
    })
})


//--------------------------------------------tiene que esperar-----------------------------------------------------
publicaciones.post('/readPublicacion', (req, res) => {
    const id_usuario = req.body.id_usuario
    
    const respuesta = {
        informacionPublicacion: "",
        informacionMascota: "",
        informacionDesaparicion: ""
    }

    connection.query('SELECT * FROM publicacion WHERE id_usuario = ?', [id_usuario], async (error, response) => {
        if (error) {
            return res.send(console.log('No pudimos traer tus publicaciones'));
        }

        if (response.length === 0) {
            return res.send(console.log('No tienes publicaciones'));
        }

        for(let i = 0; i < response.length; i++) {
            const informacionPublicacion = response.json()
            const id_publicacion = response[i].id_publicacion

            try {
                const [informacionMascota, informacionDesaparicion] = await Promise.all([
                    new Promise((resolve, reject) => {
                        connection.query('SELECT * FROM informacion_mascota WHERE id_publicacion = ?', [id_publicacion], (errorIM, responseIM) => {
                            if (error) {
                                return reject('No pudimos traer esa información de desaparición');
                            }
                            if (response.length === 0) {
                                return reject('No tienes publicaciones');
                            }
                            resolve(response);
                        })
                    }), 

                    new Promise((resolve, reject) => {
                        connection.query('SELECT * FROM informacion_desaparicion WHERE id_publicacion = ?', [id_publicacion], (error, response) => {
                            if (error) {
                                return reject('No pudimos traer esa información de desaparición');
                            }
                            if (response.length === 0) {
                                return reject('No tienes publicaciones');
                            }
                            resolve(response);
                        });
                    })
                ])
                
                respuesta += {
                    informacionPublicacion: informacionPublicacion,
                    informacionMascota: informacionMascota,
                    informacionDesaparicion: informacionDesaparicion
                }

            } catch (error) {
                console.log('No pudimos traer la información de tu publicación')
            }
        }
        
        console.log(respuesta)
        return res.json(respuesta)
    })
});

publicaciones.post('/crearChat', (req, res) => {
    const id_publicacion = req.body.id_publicacion

    connection.query('INSERT INTO chat_publicacion (id_publicacion) VALUES (?)', [id_publicacion], (error, response) => {
        if ( error ) {
            res.status(400).send(console.log('No hemos podido comunicarnos con este usuario, intente más tarde', error))
        }
    })
})

export default publicaciones