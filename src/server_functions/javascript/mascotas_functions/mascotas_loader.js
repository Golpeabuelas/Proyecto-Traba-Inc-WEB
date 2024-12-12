import { Router } from "express";
import connection from "../../connection_sql.js";

const mascotasLoader = Router()

mascotasLoader.post('/agregarMascota', async (req, res) => {
    const id_usuario = req.body.id_usuario
    const nombre_mascota = req.body.nombre_mascota
    const especie_mascota = req.body.especie_mascota
    const foto_mascota = req.body.foto_mascota

    try {
        await connection.execute('INSERT INTO mascota (id_usuario, nombre_mascota, especie_mascota, foto_mascota) VALUES (?, ?, ?, ?)', [id_usuario, nombre_mascota, especie_mascota, foto_mascota])

        return res.send(console.log('Mascota agregada'))
    } catch (error) {
        return res.send(console.log('Error al agregar a la mascota'))
    }

})

mascotasLoader.post('/cargarMascotas', async (req, res) => {
    const id_usuario = req.body.id_usuario

    try {
        const response = await connection.execute('SELECT * FROM mascota WHERE id_usuario = ?', [id_usuario])

        return res.json(response.rows)
    } catch (error) {
        return res.send(console.log('No pudimos traer la información de tus mascotas'))
    }
})

export default mascotasLoader