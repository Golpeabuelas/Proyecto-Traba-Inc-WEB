const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: ''}

export async function cargarPublicacion (contenedor, id_publicacion) {
    if ( id_publicacion !== 0) {        
        const publicacion = await cargarInformacionPublicacion(id_publicacion)

        const usuario = await cargarNombreUsuarioDueño(publicacion.informacion_publicacion.id_usuario)

        const btn = fillPost(usuario, publicacion, contenedor)
        return btn
    } else {
        window.location.href = '/inicio'
    }
}

export function userDataLoader (contenedor, session) {
    if ( session == true ){ 
        contenedor.href = '/perfil'
        contenedor.innerHTML = `<img src="${usedUser.foto_usuario}" alt="">`
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

