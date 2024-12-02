import { userDataLoader } from "./loading_index.js"

const contenedorAcceso = document.getElementById('enlace_perfil')

const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: "" };

    if ( usedUser.correo !== "" ) {
        userDataLoader(contenedorAcceso, true)
    } else {
        userDataLoader(contenedorAcceso, false)
    }

