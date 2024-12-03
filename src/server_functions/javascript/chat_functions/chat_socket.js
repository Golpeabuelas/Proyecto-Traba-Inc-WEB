import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'

const socket = io()

const formulario = document.getElementById('form')
const input = document.getElementById('input')
const mensajes = document.getElementById('mensajes')

socket.on('chat message', (mensaje) => {
    const item = `<div class="chat__msg msgRecibido">${mensaje}</div>`
    mensajes.insertAdjacentHTML('beforeend', item)
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    if ( input.value ) {
        socket.emit('chat message', input.value)
        input.value = ''
    }
})