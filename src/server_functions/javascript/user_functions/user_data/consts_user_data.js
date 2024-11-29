import { entrarPerfil, userDataLoader } from "./user_data_loader.js"

const contenedorInformacion = document.getElementById('enlace_perfil')

const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: "" };

    if ( usedUser.correo !== "" ) {
        entrarPerfil()
        userDataLoader(contenedorInformacion, true)
    } else {
        userDataLoader(contenedorInformacion, false)
    }

