import { Router } from "express"
import connection from "../../connection_sql.js"

const publicaciones = Router()

publicaciones.post('/crearPublicacion', (req, res) => {
    const id_usuario = req.body.id_usuario
    const titulo_publicacion = req.body.titulo_publicacion
    const fecha_publicacion = req.body.fecha_publicacion
    const imagen_mascota = req.body.imagen_mascota
    const nombre_mascota = req.body. nombre_mascota
    const especie_mascota = req.body.especie_mascota
    const color_mascota = req.body.color_mascota
    const distintivo_mascota = req.body.distintivo_mascota
    const fecha_desaparicion = req.body.fecha_desaparicion
    const descripcion_desaparicion = req.body.descripcion_desaparicion
    const estatus_reporte = req.body.estatus_reporte
    const latitud = req.body.latitud
    const longitud = req.body.longitud

    connection.query('INSERT INTO publicacion (id_usuario, titulo_publicacion, fecha_publicacion) VALUES (?, ?, ?)', [id_usuario, titulo_publicacion, fecha_publicacion], (errorP, responseP) => {
        if ( errorP ) {
            res.status(400).send(console.log('Error al crear tu publicación', errorP))
        }

        const id_publicacion = responseP.insertId

        connection.query('INSERT INTO informacion_mascota (id_publicacion, imagen_mascota, nombre_mascota, especie_mascota, color_mascota, distintivo_mascota) VALUES (?, ?, ?, ?, ?, ?)', [id_publicacion, imagen_mascota, nombre_mascota, especie_mascota, color_mascota, distintivo_mascota], (errorIM, responseIM) => {
            if ( errorIM ) {
                res.status(400).send(console.log('Error al crear tu publicación', errorIM))
            }
        })

        connection.query('INSERT INTO informacion_desaparicion (id_publicacion, fecha_desaparicion, descripcion_desaparicion, estatus_desaparicion, estatus_reporte) VALUES (?, ?, ?, ?, ?)', [id_publicacion, fecha_desaparicion, descripcion_desaparicion, true, estatus_reporte], (errorID, responseID) => {
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

export default publicaciones