import { cargarPublicacion, userDataLoader } from "./loading_post_chat.js";
import { procesoAbrirChat } from "./loading_chat.js";

const id_publicacion = localStorage.getItem('Publicacion') || 0
const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: "" };
localStorage.removeItem('Publicacion')

const contenedorAcceso = document.getElementById('enlace_perfil')
    if ( usedUser.correo !== "" ) {
        userDataLoader(contenedorAcceso, true)
    } else {
        userDataLoader(contenedorAcceso, false)
    }

const contenedor = document.getElementById('contenedor_chat_publicacion')

const btn = await cargarPublicacion(contenedor, id_publicacion)
const contenedorChat = document.getElementById('chat')

btn.addEventListener('click', () => { 
    procesoAbrirChat(id_publicacion, usedUser.correo, contenedorChat)
})
