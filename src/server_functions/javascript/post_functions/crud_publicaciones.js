import { Router } from "express"
import connection from "../../connection_sql.js"

const publicaciones = Router()

publicaciones.post('/crearPublicacion', async (req, res) => {
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

    try {
        const response = await connection.execute('INSERT INTO publicacion (id_usuario, titulo_publicacion, fecha_publicacion) VALUES (?, ?, ?)', [id_usuario, titulo_publicacion, fecha_publicacion])

        const id_publicacion = response.lastInsertRowid

        await connection.execute('INSERT INTO informacion_mascota (id_publicacion, imagen_mascota, nombre_mascota, especie_mascota, color_mascota, distintivo_mascota) VALUES (?, ?, ?, ?, ?, ?)', [id_publicacion, imagen_mascota, nombre_mascota, especie_mascota, color_mascota, distintivo_mascota])

        await connection.execute('INSERT INTO informacion_desaparicion (id_publicacion, fecha_desaparicion, descripcion_desaparicion, estatus_desaparicion, estatus_reporte) VALUES (?, ?, ?, ?, ?)', [id_publicacion, fecha_desaparicion, descripcion_desaparicion, true, estatus_reporte])

        await connection.execute('INSERT INTO ubicacion_desaparicion (id_publicacion, latitud, longitud) VALUES (?, ?, ?)', [id_publicacion, latitud, longitud])

        return res.send(console.log('Publicacion y relaciones hechas correctamente'))
    } catch (error) {
        return res.send(console.log('Error al crear tu publicación'))
    }
})

export default publicaciones