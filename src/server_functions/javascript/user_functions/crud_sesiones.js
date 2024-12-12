import { response, Router } from "express";
import connection from "../../connection_sql.js"

const sesiones = Router()

sesiones.post('/aniadirUsuario', async  (req, res) => {
    const nombre = req.body.nombre
    const correo = req.body.correo
    const password = req.body.password
    const foto_usuario = req.body.foto_usuario
    const permisos = req.body.permisos
    const latitud = req.body.latitud
    const longitud = req.body.longitud

    try {
        const response = await connection.execute('INSERT INTO usuario (nombre, correo, password, foto_usuario, permisos) VALUES (?, ?, ?, ?, ?)', [nombre, correo, password, foto_usuario, permisos])

        const id_usuario = response.lastInsertRowid

        await connection.execute('INSERT INTO ubicacion_usuario (id_usuario, latitud, longitud) VALUES (?, ?, ?)', [id_usuario, latitud, longitud])

        return console.log('Sesión agregada correctamente')
    } catch (error) {
        return res.send(console.log('Error al añadir nueva sesión'))
    }
})

sesiones.post('/editarUsuario', (req, res) => {
    const id_usuario = req.body.id_usuario
    const nombre = req.body.nombre
    const password = req.body.password
    const permisos = req.body.permisos

    connection.query('UPDATE usuario SET (nombre = ?, password = ?, permisos = ? WHERE id_usuario = ?)', [nombre, password, permisos, id_usuario], (error, response) => {
        if ( error ) {
            res.status(400).send(console.log('Error al editar datos del usuario', error))
        }

        if ( response.affectedRows === 0 ) {
            res.status(404).send(console.log('Usuario no encontrado'))
        }

        console.log('Sesión actualizada exitosamente')
        res.json(response)
    })
})

sesiones.post('/borrarUsuario', (req, res) => {
    id_usuario = req.body.id_usuario

    connection.query('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario], (error, response) => {
        if ( error ) {
            res.status(400).send(console.log('Error al eliminar la sesión', error))
        }

        if ( response.affectedRows === 0 ) {
            res.status(404).send(console.log('Usuario no encontrado'))
        }

        res.send(console.log('Usuario eliminado exitosamente'))
    })
})

export default sesiones