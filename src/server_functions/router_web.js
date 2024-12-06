import { Router } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router()

//-------------------------RUTAS-DE-CONEXION------------------------

router.get('/index', (req, res) => {
    res.sendFile(join(__dirname, '../public/modulos/index/index.html'))
});

router.get('/sign_in', (req, res) => {
    res.sendFile(join(__dirname, '../public/modulos/sesiones/sign_in/sign_in.html'))
});

router.get('/sign_up', (req, res) => {
    res.sendFile(join(__dirname, '../public/modulos/sesiones/sign_up/sign_up.html'))
});

router.get('/inicio', (req, res) => {
    res.sendFile(join(__dirname, '../public/modulos/inicio/inicio.html'))
})

router.get('/chat/:id', (req, res) => {
    res.sendFile(join(__dirname, '../public/modulos/perfil/publicaciones/chat/chat.html'))
});

router.get('/perfil', (req, res) => {
    res.sendFile(join(__dirname, '../public/modulos/perfil/usuario/perfil.html'))
});

router.get('/report', (req, res) => {
    res.sendFile(join(__dirname, '../public/modulos/perfil/publicaciones/create/create_report.html'))
})

router.get('/respuestas', (req, res) => {
    res.sendFile(join(__dirname, '../public/modulos/perfil/publicaciones/read/perfil_publicaciones.html'))
})

router.get('/prueba', (req, res) => {
    res.sendFile(join(__dirname, '../public/modulos/perfil/publicaciones/chat/chat_provisional.html'))
})

router.get('/mascotas', (req, res) => {
    res.sendFile(join(__dirname, '../public/modulos/perfil/mascotas/mascotas.html'))
})

export default router;