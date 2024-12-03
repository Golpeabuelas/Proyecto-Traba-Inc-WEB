import { Router } from "express";
import connection from "../../connection_sql.js";

const userLoader = Router()

userLoader.post('/buscarSesionExistente', (req, res) => {
    const correo = req.body.correo

    connection.query('SELECT * FROM usuario WHERE correo = ?', [correo], (error, response, fields) => {
        if ( error ) {
            return res.status(400).send(console.log('Error al buscar sesión', error))
        }
        
        if ( response.length === 0) { 
            return res.json({ correoDisponible: true })
        }

        if ( response.length !== 0) {
            return res.json({ correoDisponible: false })
        }
    })
})

userLoader.post('/otorgarPermisos', (req, res) => {
    const password = req.body.password

    if( password === 'Tr4b4_1nc_4dm1n1str4d0r' ){
        return res.json({ permisos: true })
    }

    return res.json({ permisos: false })
})

userLoader.post('/iniciarSesion', (req, res) => {
    const correo = req.body.correo
    const password = req.body.password

    connection.query('SELECT * FROM usuario WHERE correo = ?', [correo], (error, response) => {
        if ( error ) {
            return res.status(400).send(console.log('Error al iniciar sesión', error))
        }

        if ( response.length === 0 ) {
            return res.json({ Correo: false, Acceso: false})
        }

        if ( password === response[0].password) {
            res.json({ Response: response[0], Acceso: true })
        }

        if ( password !== response[0].password) {
            res.json({ Acceso: false })
        }
    })
})

userLoader.post('/getUserID', (req, res) => {
    const correo = req.body.correo

    connection.query('SELECT * FROM usuario WHERE correo = ?', [correo], (error, response) => {
        if ( error ) {
            return res.status(400).send(console.log('Error al buscar la información del usuario', error))
        }

        if ( response.length === 0 ) {
            return res.status(404).send(console.log('Usuario no encontrado'))
        }

        return res.json({ id_usuario: response[0].id_usuario })
    })
})

userLoader.post('/getUserInformation', (req, res) => {
    const id_usuario = req.body.id_usuario
    
    connection.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario], (error, response) => {
        if ( error ) {
            return res.status(400).send(console.log('No pudimos traer tu información', error))
        }

        if ( response.length === 0 ) {
            return res.status(400).send(console.log('Usuario no encontrado'))            
        }

        return res.json({ nombre: response[0].nombre, foto: response[0].foto_usuario, id_dueño: id_usuario })
    })
})

export default userLoader