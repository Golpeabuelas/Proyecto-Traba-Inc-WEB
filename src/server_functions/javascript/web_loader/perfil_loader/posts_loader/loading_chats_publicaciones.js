export async function procesoCargarChats(contenedor, id_publicacion, correo) {
    const chats = await cargarChatsPublicacion(id_publicacion)
    const id_usuario = await cargarIdUsuario(correo)

    await mostrarChats(contenedor, chats, id_usuario)
}

async function cargarChatsPublicacion(id_publicacion) {
    const response = await fetch('/obtenerChatsPublicacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_publicacion })
    })

    const respuesta = await response.json()
    return respuesta
}

export async function cargarIdUsuario(correo) {
    const response = await fetch('/getUserID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo })
    })

    const id_usuario = await response.json()
    return id_usuario.id_usuario
}

async function mostrarChats (contenedor, chats, id_owner) {
    contenedor.innerHTML = ''

    for (let i = 0; i < chats.length; i++) {
        const idReader = await cargarIntegranteChat(id_owner, chats[i].id_chat)
        const datosReader = await cargarInformacionReader(idReader)

        contenedor.innerHTML += `
            <div class="reporte__content reporte__contentchat">
                <div class="reporte__content--img">
                    <img src="${datosReader.foto}" alt="" >
                </div>
                <div class="reporte__content--name">
                    ${datosReader.nombre}
                </div>
                <div class="chat__form" data-value="${chats[i].id_chat}">
                    <a class="iniciosesion__submit">VER CHAT</a>
                </div>
            </div>
        `
    }
}

export async function cargarIntegranteChat(id_usuario, id_chat) {
    const response = await fetch('/obtenerParticipantesChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario, id_chat })
    })

    const id_reader = await response.json()
   
    return id_reader.id_reader
}

async function cargarInformacionReader(id_usuario) {
    const response = await fetch('/getUserInformation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario })
    })

    const datos = await response.json()
    
    return datos
}

