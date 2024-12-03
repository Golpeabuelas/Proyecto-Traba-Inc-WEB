import { Router } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router()

//-------------------------RUTAS-DE-CONEXION------------------------

router.get('/index', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/index.html'))
});

router.get('/chat/:id', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/chat.html'))
});

router.get('/perfil', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/perfil.html'))
});

router.get('/sign_in', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/sign_in.html'))
});

router.get('/sign_up', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/sign_up.html'))
});

router.get('/inicio', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/inicio.html'))
})

router.get('/report', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/create_report.html'))
})

router.get('/respuestas', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/respuestas.html'))
})

router.get('/prueba', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/chat_provisional.html'))
})

export default router;