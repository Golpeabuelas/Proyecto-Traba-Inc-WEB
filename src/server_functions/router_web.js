import { Router } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router()

//-------------------------RUTAS-DE-CONEXION------------------------

router.get('/index', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/index.html'))
});

router.get('/chat', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/chat.html'))
});

router.get('/perfil', (req, res) => {
    res.sendFile(join(__dirname, '../public/html/perfil.html'))
});


export default router;