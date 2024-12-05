import { cargarPublicacion, userDataLoader } from "./loading_post_chat.js";
import { procesoAbrirChat } from "./loading_chat.js";
import { procesoAbrirChatOwner } from "./loading_chat_owner.js";
import { crearMensaje } from "./send_message.js";

const id_publicacion = localStorage.getItem('Publicacion') || 0
const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: "" };
const chatCreado = JSON.parse(localStorage.getItem('Chat')) || null

localStorage.removeItem('Publicacion')
localStorage.removeItem('Chat')

const contenedorAcceso = document.getElementById('enlace_perfil')
    if ( usedUser.correo !== "" ) {
        userDataLoader(contenedorAcceso, true)
    } else {
        userDataLoader(contenedorAcceso, false)
    }

const contenedor = document.getElementById('contenedor_chat_publicacion')

const btn = await cargarPublicacion(contenedor, id_publicacion)
const contenedorChat = document.getElementById('chat')

if ( chatCreado ) {
    btn.addEventListener('click', async () => { 
        await procesoAbrirChatOwner(chatCreado.idOwner, chatCreado.idReader, chatCreado.idChat, contenedorChat)
    
        const btnEnviar = document.getElementById('btnSendMessage')
        const mensaje = document.getElementById('input')

        btnEnviar.addEventListener('click', async (e) => {
            e.preventDefault()

            if ( mensaje.value !== mensaje.defaultValue ) {
                await crearMensaje(chatCreado.idOwner, chatCreado.idChat, mensaje.value )
                alert('Se mandó, neta w')
            }
        })
    })


} else {
    btn.addEventListener('click', async () => { 
        const datos = await procesoAbrirChat(id_publicacion, usedUser.correo, contenedorChat)

        const btnEnviar = document.getElementById('btnSendMessage')
        const mensaje = document.getElementById('input')

        btnEnviar.addEventListener('click', async (e) => {
            e.preventDefault()

            if ( mensaje.value !== mensaje.defaultValue ) {
                await crearMensaje(datos.idUser, datos.idChat, mensaje.value )
                alert('Se mandó, neta w')
            }
        })
    })
}
    
