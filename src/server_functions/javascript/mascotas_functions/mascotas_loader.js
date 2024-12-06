import { Router } from "express";
import connection from "../../connection_sql.js";

const mascotasLoader = Router()

mascotasLoader.post('/agregarMascota', (req, res) => {
    const id_usuario = req.body.id_usuario
    const nombre_mascota = req.body.nombre_mascota
    const especie_mascota = req.body.especie_mascota
    const foto_mascota = req.body.foto_mascota

    connection.query('INSERT INTO mascota (id_usuario, nombre_mascota, especie_mascota, foto_mascota) VALUES (?, ?, ?, ?)', [id_usuario, nombre_mascota, especie_mascota, foto_mascota], (error, response) => {
        if ( error ) {
            return res.send(console.log('No pudimos hacer el insert', error))
        }

        return res.send(console.log('Acabate'))
    })
})

mascotasLoader.post('/cargarMascotas', (req, res) => {
    const id_usuario = req.body.id_usuario

    connection.query('SELECT * FROM mascota WHERE id_usuario = ?', [id_usuario], (error, response) => {
        if ( error ) {
            return res.send(console.log('No pudimos traer la información de tus mascotas'))
        }

        return res.json(response)
    })
})

export default mascotasLoader