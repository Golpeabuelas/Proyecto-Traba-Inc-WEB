import { postLoader, userDataLoader } from "./loading_inicio.js";

const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: ''}

const contenedorPublicaciones = document.getElementById('contenedor_publicaciones')
const contenedorAcceso = document.getElementById('enlace_perfil')

if( usedUser.correo !== '') {     
    userDataLoader(contenedorAcceso, true)
    
    postLoader(contenedorPublicaciones)

    contenedorPublicaciones.addEventListener('click', (event) => {
        if (event.target.classList.contains('chat-button')) {
            const idPublicacion = event.target.value;

            localStorage.setItem('Publicacion', idPublicacion)

            window.location.href = `/chat/${idPublicacion}`;
        }
    })
} else {
    window.location.href = '/sign_in'
}


