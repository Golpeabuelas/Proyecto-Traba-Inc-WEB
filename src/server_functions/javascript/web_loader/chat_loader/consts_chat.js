import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'
import { cargarPublicacion, userDataLoader } from "./loading_post_chat.js";
import { procesoAbrirChatReader } from "./loading_chat_reader.js";
import { procesoAbrirChatOwner } from "./loading_chat_owner.js";
import { cargarMensajes, crearMensaje, mostrarMensajes } from "./send_message.js";

const socket = io()

const chatEncapsulado = {
    id_owner: null,
    id_reader: null,
    id_chat: null
}

const id_publicacion = localStorage.getItem('Publicacion') || 0
const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: "" };
const chatCreado = JSON.parse(localStorage.getItem('Chat')) || null

localStorage.removeItem('Publicacion')
localStorage.removeItem('Chat')

const contenedorAcceso = document.getElementById('enlace_perfil')

    if ( usedUser.correo !== "" ) {
        userDataLoader(contenedorAcceso, true)
    } else {
        window.location.href = 'sign_in'
    }

const contenedor = document.getElementById('contenedor_chat_publicacion')

const btn = await cargarPublicacion(contenedor, id_publicacion)
const contenedorChat = document.getElementById('chat')

if ( chatCreado ) {
    btn.addEventListener('click', async () => { 
        await procesoAbrirChatOwner(chatCreado.idOwner, chatCreado.idReader, chatCreado.idChat, contenedorChat)
    
        const contenedorMensajes = document.getElementById('mensajes')
        const mensajes = await cargarMensajes(chatCreado.idOwner, chatCreado.idReader, chatCreado.idChat)
        mostrarMensajes(contenedorMensajes, mensajes)

        const btnEnviar = document.getElementById('btnSendMessage')
        const mensaje = document.getElementById('input')

        chatEncapsulado.id_owner = chatCreado.idOwner
        chatEncapsulado.id_reader = chatCreado.idReader
        chatEncapsulado.id_chat = chatCreado.idChat

        btnEnviar.addEventListener('click', async (e) => {
            e.preventDefault()

            if ( mensaje.value !== mensaje.defaultValue ) {
                socket.emit('chat message', { id_owner: chatEncapsulado.id_owner, id_reader: chatEncapsulado.id_reader, id_chat: chatEncapsulado.id_chat, mensaje: mensaje.value })
                mensaje.value = ''
            }
        })
    })
} else {
    btn.addEventListener('click', async () => { 
        const datos = await procesoAbrirChatReader(id_publicacion, usedUser.correo, contenedorChat)

        const contenedorMensajes = document.getElementById('mensajes')
        const mensajes = await cargarMensajes(datos.idReader, datos.idOwner, datos.idChat)
        mostrarMensajes(contenedorMensajes, mensajes)

        const btnEnviar = document.getElementById('btnSendMessage')
        const mensaje = document.getElementById('input')

        chatEncapsulado.id_owner = datos.idReader
        chatEncapsulado.id_reader = datos.idOwner
        chatEncapsulado.id_chat = datos.idChat

        btnEnviar.addEventListener('click', (e) => {
            e.preventDefault()

            if ( mensaje.value !== mensaje.defaultValue ) {
                socket.emit('chat message', { id_owner: chatEncapsulado.id_owner, id_reader: chatEncapsulado.id_reader, id_chat: chatEncapsulado.id_chat, mensaje: mensaje.value })
                mensaje.value = ''
            }
        })
    })
}

socket.on('chat message', async ({ id_owner, id_reader, id_chat}) => {
    if ( id_owner === chatEncapsulado.id_owner && id_reader === chatEncapsulado.id_reader && id_chat === chatEncapsulado.id_chat ) {
        try {
            const mensajes = await cargarMensajes(id_owner, id_reader, id_chat)
            const contenedorMensajes = document.getElementById('mensajes')
            mostrarMensajes(contenedorMensajes, mensajes)
        } catch (error) {
            console.error('Fallamos la solicitud del proceso del mensaje', error)
        }
    } else if ( id_owner === chatEncapsulado.id_reader && id_reader === chatEncapsulado.id_owner && id_chat === chatEncapsulado.id_chat ) {
        try {
            const mensajes = await cargarMensajes(id_reader, id_owner, id_chat)
            const contenedorMensajes = document.getElementById('mensajes')
            mostrarMensajes(contenedorMensajes, mensajes)
        } catch (error) {
            console.error('Fallamos la solicitud del proceso del mensaje', error)
        }
    }
})