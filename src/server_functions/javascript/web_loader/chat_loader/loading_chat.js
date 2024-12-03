const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: ''}
const id_publicacion = localStorage.getItem('Publicacion') || 0

localStorage.removeItem('Publicacion')

const responseOwner = await cargarInformacionPublicacion(id_publicacion)
const id_usuario_owner_post = responseOwner.informacion_publicacion.id_usuario 

const responseReader = await cargarIdReader()
const id_usuario_reader_post = responseReader.id_usuario

const crearChat = await verificarExistencia(id_usuario_reader_post, id_usuario_owner_post, id_publicacion)
const id_chat = crearChat.id_chat
const verificacion = crearChat.crear

export async function cargarPublicacion (contenedor) {
    if ( id_publicacion !== 0) {        
        const publicacion = await cargarInformacionPublicacion(id_publicacion)

        const usuario = await cargarNombreUsuarioDueño(publicacion.informacion_publicacion.id_usuario)

        const btn = fillPost(usuario, publicacion, contenedor)
        return btn
    } else {
        alert('entra desde la card de la publicacion')
    }
}

function fillPost (datosUsuario, datosPublicacion, contenedor) {
    contenedor.innerHTML += `
        <div class="post">
            <div class="posttitle__wrapper">
                <h2 class="post__title">${datosPublicacion.informacion_publicacion.titulo_publicacion}</h2>
            </div>
            <div class="post__profile">
                <img src="${datosUsuario.foto}" alt="" class="post__profile--img">
                <p class="post__profile--name">${datosUsuario.nombre}</p>
            </div>
            <div class="post__infoperro1">
                <img src="${datosPublicacion.informacion_mascota.imagen_mascota}" alt="" class="post__infoperro1--image">
                <div class="post__infoperro1--content">
                    <div class="post__infoperro1--name">Nombre: ${datosPublicacion.informacion_mascota.nombre_mascota}</div>
                    <div class="post__infoperro1--place">Lugar donde se encontró: Ciudad Peluche</div>
                    <div class="post__infoperro1--especie">Especie: ${datosPublicacion.informacion_mascota.especie_mascota}</div>
                    <div class="post__infoperro1--color">Color: ${datosPublicacion.informacion_mascota.color_mascota}</div>
                    <div class="post__infoperro1--distintivos">Distintivos: ${datosPublicacion.informacion_mascota.distintivo_mascota}</div>
                </div>
            </div>
            <div class="post__infoperro2">
                <div class="post__infoperro2--descriptiontitle1">
                    <h2 class="post__infoperro2--descriptiontitle">Descripción:</h2>
                </div>
                <div class="post__infoperro2--description">
                    ${datosPublicacion.informacion_desaparicion.descripcion_desaparicion}
                </div>
            </div>
        </div>
        <div class="chat" id="chat">
            <div class="chat__content">
                <div class="posttitle__wrapper--chat">
                    <h2 class="post__title--chat">CHAT</h2>
                </div>
                <div class="chat__wrapper">
                    <div class="chat__wrapper--fondo" id="mensajes">
                        <div id="mapa">

                        </div>
                    </div>

                    <input type="submit" class="chat__buttonEnviar" value="chatear" id="btn_empezar_chat">
                </div>
            </div>
        </div>
    `

    const mapa = document.getElementById('mapa')

    cargarMapa(mapa, datosPublicacion.ubicacion_desaparicion.latitud, datosPublicacion.ubicacion_desaparicion.longitud)

    const btnChatear = document.getElementById('btn_empezar_chat')
    return btnChatear
} 

function cargarMapa(mapa, latitud, longitud) {
    const map = L.map(mapa).setView([latitud, longitud], 15)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marcador = L.marker([latitud, longitud])
    marcador.addTo(map)
}

export async function relacionarUsuarios (contenedor) {
    if ( verificacion === true ) {
        const id_chat = await makeChat()

        crearRelaciones(id_usuario_owner_post, id_chat)
        crearRelaciones(id_usuario_reader_post, id_chat)
    }
    
    contenedor.innerHTML = `
        <div class="chat__content">
            <div class="posttitle__wrapper--chat">
                <h2 class="post__title--chat">CHAT</h2>
            </div>
            <div class="chat__wrapper">
                <div class="chat__wrapper--fondo" id="mensajes">

                </div>
                <form id="form" class="chat__form">
                    <textarea id="input" class="chat__input" placeholder="Escriba su mensaje aquí"></textarea>
                    <input type="submit" class="chat__buttonEnviar">
                </form>
            </div>
        </div>
    `

    const contenedorChat = document.getElementById('mensajes')
    //fillChat(contenedorChat)
    const form = document.getElementById('form')
    return form
}

async function verificarExistencia (id_usuario_reader, id_usuario_owner, id_publicacion) {
    const response = await fetch('/verificarChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ id_usuario_reader, id_usuario_owner, id_publicacion})
    })

    const respuesta = await response.json()
    return respuesta
}

async function makeChat () {
    const response = await fetch('/crearChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_publicacion })
    })

    const id_chat = await response.json()
    return id_chat.id_chat
}

async function crearRelaciones (id_usuario, id_chat) {
    const response = fetch('/relacionarUsuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario, id_chat })
    })
}

async function cargarInformacionPublicacion (id_publicacion) {
    const response = await fetch('/readAPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_publicacion })
    })

    const publicacion = await response.json()
    return publicacion
}

async function cargarNombreUsuarioDueño (id_usuario) {
    const response = await fetch('/getUserInformation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario })
    })

    const usuario = await response.json()

    return usuario
}

async function cargarIdReader () {
    const correo = usedUser.correo

    const response = await fetch('/getUserID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo })
    })

    const id_reader = await response.json()

    return id_reader
}

export function userDataLoader (contenedor, session) {
    if ( session == true ){ 
        contenedor.href = '/perfil'
        contenedor.innerHTML = `<img src="${usedUser.foto_usuario}" alt="">`
    } else {
        contenedor.href = '/sign_in'
        contenedor.innerHTML = 'Inicio Sesión'
    }
}

export async function guardarMensaje (mensaje) {
    crearMensaje(id_usuario_reader_post, id_chat, mensaje)
}

async function crearMensaje (id_usuario, id_chat, mensaje) {
    const response = await fetch('/crearMensaje', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario, id_chat, mensaje }) 
    })
}

async function cargarChatContent () {
    const response = await fetch('/loadChatContent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario_owner_post, id_usuario_reader_post, id_chat })
    })

    const respuesta = await response.json()
    console.log(respuesta)
    return respuesta
}

export async function fillChat (contenedor) {
    const mensajes = await cargarChatContent()
    
    for (let i = 0; i < mensajes.mensaje.length; i++) {
        contenedor.innerHTML += `
            <div class="chat__msg ${mensajes.mensaje[i].Propietario === true ? 'msgEnviado' : 'msgRecibido'}">${mensajes.mensaje[i].Mensaje}</div>
        `
    }
}
