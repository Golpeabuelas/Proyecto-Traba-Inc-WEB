import { Router } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router()

//-------------------------RUTAS-DE-CONEXION------------------------

router.get('/*ruta*', (req, res) => {
    res.sendFile(join(__dirname, '*RUTA-DE-ARCHIVO-RELATIVA-AL-ARCHIVO-ROUTER*'))
});

export default router;