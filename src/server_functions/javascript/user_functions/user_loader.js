import { Router } from "express";
import connection from "../../connection_sql.js";

const userLoader = Router()

userLoader.post('/buscarSesionExistente', async (req, res) => {
    const correo = req.body.correo

    try {
        const response = await connection.execute('SELECT * FROM usuario WHERE correo = ?', [correo])

        if ( response.rows.length === 0) { 
            return res.json({ correoDisponible: true })
        }

        if ( response.rows.length > 0) {
            return res.json({ correoDisponible: false })
        }
    } catch (error) {
        return res.send(console.log('Error al buscar sesión'))
    }
})

userLoader.post('/otorgarPermisos', (req, res) => {
    const password = req.body.password

    if( password === 'Tr4b4_1nc_4dm1n1str4d0r' ){
        return res.json({ permisos: true })
    }

    return res.json({ permisos: false })
})

userLoader.post('/iniciarSesion', async (req, res) => {
    const correo = req.body.correo
    const password = req.body.password

    try {
        const response = await connection.execute('SELECT * FROM usuario WHERE correo = ?', [correo])

        if ( response.rows.length === 0 ) {
            return res.json({ Correo: false, Acceso: false})
        }

        if ( password === response.rows[0].password) {
            return res.json({ Response: response.rows[0], Acceso: true })
        }

        if ( password !== response.rows[0].password) {
            return res.json({ Acceso: false })
        }
    } catch (error) {
        return console.log('Ocurrió un error al iniciar sesión')
    }
})

userLoader.post('/getUserID', async (req, res) => {
    const correo = req.body.correo

    try {
        const response = await connection.execute('SELECT * FROM usuario WHERE correo = ?', [correo])

        return res.json({ id_usuario: response.rows[0].id_usuario })
    } catch (error) {
        return res.send(console.log('Error al buscar la id del usuario'))
    }
})

userLoader.post('/getUserInformation', async (req, res) => {
    const id_usuario = req.body.id_usuario
    
    try {
        const response = await connection.execute('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario])

        return res.json({ nombre: response.rows[0].nombre, foto: response.rows[0].foto_usuario, id_dueño: id_usuario })
    } catch (error) {
        return res.send(console.log('Error al buscar la información del usuario'))
    }
})

export default userLoader