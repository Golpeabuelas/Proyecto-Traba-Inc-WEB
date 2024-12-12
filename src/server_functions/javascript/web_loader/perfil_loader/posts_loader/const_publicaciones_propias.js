import { procesoCargarPublicaciones, userDataLoader } from "./loading_publicaciones.js"
import { procesoCargarChats, cargarIdUsuario, cargarIntegranteChat } from "./loading_chats_publicaciones.js"

const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: null }

const contenedorAcceso = document.getElementById('enlace_perfil')
const contenedorPublicaciones = document.getElementById('contenedor_publicaciones')
const contenedorChats = document.getElementById('contenedor_chats')

let reportes = null
let chats = null

if ( usedUser.correo ) {
    userDataLoader(contenedorAcceso, true)
} else {
    window.location.href = 'sign_in'
}

if ( usedUser ) {
    await procesoCargarPublicaciones(contenedorPublicaciones, usedUser.correo)
    
    reportes = document.getElementsByClassName('publicaciones')
}

if ( reportes ) {
    for (let i = 0; i < reportes.length; i++) {
        reportes[i].addEventListener('click', async () => {
            await procesoCargarChats(contenedorChats, reportes[i].dataset.value, usedUser.correo)

            chats = document.getElementsByClassName('chat__form')
            
            if ( chats ) {
                for (let j = 0; j < chats.length; j++) {
                    chats[j].addEventListener('click', async () => {
                        const id_chat = chats[j].dataset.value
                        const id_usuario = await cargarIdUsuario(usedUser.correo)
                        const id_reader = await cargarIntegranteChat(id_usuario, id_chat)

                        const chat = {
                            idChat: parseInt(id_chat),
                            idOwner: id_usuario,
                            idReader: id_reader
                        }

                        localStorage.setItem('Chat', JSON.stringify(chat))
                        localStorage.setItem('Publicacion', reportes[i].dataset.value)
                        window.location.href = `/chat/${reportes[i].dataset.value}`
                    })
                }
            }
        })
    }
}

