import { cargarPublicacion, relacionarUsuarios, userDataLoader, guardarMensaje } from "./loading_chat.js";
import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

const contenedorAcceso = document.getElementById('enlace_perfil')

const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: "" };

    if ( usedUser.correo !== "" ) {
        userDataLoader(contenedorAcceso, true)
    } else {
        userDataLoader(contenedorAcceso, false)
    }

const contenedor = document.getElementById('contenedor_chat_publicacion')

const btn = await cargarPublicacion(contenedor)
const contenedorChat = document.getElementById('chat')

const socket = io()

btn.addEventListener('click', async () => {
    const formulario = await relacionarUsuarios(contenedorChat)
    const input = document.getElementById('input')
    const mensajes = document.getElementById('mensajes')

    /*socket.on('chat message', (mensaje) => {
        const item = `<div class="chat__msg msgRecibido">${mensaje}</div>`
        mensajes.insertAdjacentHTML('beforeend', item)
    })*/

    formulario.addEventListener('submit', (e) => {
        e.preventDefault()

        if ( input.value ) {
            guardarMensaje(input.value)
            input.value = null 
        }
        /*if ( input.value ) {
            socket.emit('chat message', input.value)
            input.value = ''
        }*/
    })
})

