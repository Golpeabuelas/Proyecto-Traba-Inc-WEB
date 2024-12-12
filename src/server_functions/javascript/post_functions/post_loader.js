import { Router } from "express";
import connection from "../../connection_sql.js";

const postLoader = Router()

postLoader.post('/readOwnPosts', async (req, res) => {
    const id_usuario = req.body.id_usuario
    
    const respuesta = {
        informacion_Publicacion: [],
        informacion_Mascota: [],
        informacion_Desaparicion: []
    }

    try {
        const response = await connection.execute('SELECT * FROM publicacion WHERE id_usuario = ?', [id_usuario])

        for(let i = 0; i < response.rows.length; i++) {
            const informacionPublicacion = response.rows[i]
            const id_publicacion = response.rows[i].id_publicacion

            const informacionMascota = await connection.execute('SELECT * FROM informacion_mascota WHERE id_publicacion = ?', [id_publicacion])
            const informacionDesaparicion = await connection.execute('SELECT * FROM informacion_desaparicion WHERE id_publicacion = ?', [id_publicacion])

            respuesta.informacion_Publicacion.push(informacionPublicacion)
            respuesta.informacion_Mascota.push(informacionMascota.rows[0])
            respuesta.informacion_Desaparicion.push(informacionDesaparicion.rows[0])
        }

        return res.json(respuesta)
    } catch (error) {
        return res.send(console.log('No pudimos traer tus publicaciones'));
    }
})

postLoader.post('/readOtherPosts', async (req, res) => {
    const id_usuario = req.body.id_usuario
    
    const respuesta = {
        informacion_Publicacion: [],
        informacion_Mascota: [],
        informacion_Desaparicion: []
    }

    try {
        const response = await connection.execute('SELECT * FROM publicacion WHERE id_usuario <> ?', [id_usuario])

        for(let i = 0; i < response.rows.length; i++) {
            const informacionPublicacion = response.rows[i]
            const id_publicacion = response.rows[i].id_publicacion

            const informacionMascota = await connection.execute('SELECT * FROM informacion_mascota WHERE id_publicacion = ?', [id_publicacion])
            const informacionDesaparicion = await connection.execute('SELECT * FROM informacion_desaparicion WHERE id_publicacion = ?', [id_publicacion])

            respuesta.informacion_Publicacion.push(informacionPublicacion)
            respuesta.informacion_Mascota.push(informacionMascota.rows[0])
            respuesta.informacion_Desaparicion.push(informacionDesaparicion.rows[0])
        }

        return res.json(respuesta)
    } catch (error) {
        return res.send(console.log('No pudimos traer tus publicaciones'));
    }
});

postLoader.post('/readAPost', async (req, res) => {
    const id_publicacion = req.body.id_publicacion

    const respuesta = {
        informacion_publicacion: '',
        informacion_mascota: '',
        informacion_desaparicion: '',
        ubicacion_desaparicion: ''
    }

    try {
        const informacionPublicacion = await connection.execute('SELECT * FROM publicacion WHERE id_publicacion = ?', [id_publicacion])
        const informacionMascota = await connection.execute('SELECT * FROM informacion_mascota WHERE id_publicacion = ?', [id_publicacion])
        const informacionDesaparicion = await connection.execute('SELECT * FROM informacion_desaparicion WHERE id_publicacion = ?', [id_publicacion])
        const ubicacionDesaparicion = await connection.execute('SELECT * FROM ubicacion_desaparicion WHERE id_publicacion = ?', [id_publicacion])

        respuesta.informacion_publicacion = informacionPublicacion.rows[0]
        respuesta.informacion_mascota = informacionMascota.rows[0]
        respuesta.informacion_desaparicion = informacionDesaparicion.rows[0]
        respuesta.ubicacion_desaparicion = ubicacionDesaparicion.rows[0]

        return res.json(respuesta)
    } catch (error) {
        return res.send(console.log('No pudimos traer la información de tu publicación'))
    }
})

export default postLoader