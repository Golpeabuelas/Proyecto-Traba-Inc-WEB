export async function procesoAbrirChatReader(id_publicacion, correo, contenedor) {
    const id_usuario_reader = await getIdUserReader(correo) || null
    const id_usuario_owner = await getIdUserOwner(id_publicacion) || null

    const existe = await verificarExistenciaChat(id_usuario_reader, id_usuario_owner, id_publicacion)
    
    if ( existe === true ) {
        const id_chat = await verificarIdChat(id_usuario_reader, id_usuario_owner, id_publicacion)
        mostrarChat(contenedor)

        const datos = {
            idReader: id_usuario_reader,
            idOwner: id_usuario_owner,
            idChat: id_chat
        }
    
        return datos
    } else if ( existe === false ) {
        const id_chat = await crearChat(id_publicacion)

        relacionarUsuarios(id_usuario_owner, id_chat)
        relacionarUsuarios(id_usuario_reader, id_chat)

        mostrarChat(contenedor)

        const datos = {
            idUser: id_usuario_reader,
            idOwner: id_usuario_owner,
            idChat: id_chat
        }
    
        return datos
    } 
}

async function verificarExistenciaChat(id_usuario_reader, id_usuario_owner, id_publicacion) {
    if ( id_usuario_reader && id_usuario_owner ) {
        const response = await fetch('/verificarExistenciaChat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario_reader, id_usuario_owner, id_publicacion })
        })

        const existe = await response.json()
        
        return existe.existe
    }
}

async function verificarIdChat(id_usuario_reader, id_usuario_owner, id_publicacion) {
    const response = await fetch('/verificarExistenciaChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario_reader, id_usuario_owner, id_publicacion })
    })

    const existe = await response.json()
    
    return existe.id_chat
}

async function getIdUserReader(correo) {
    const response = await fetch('/getUserID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo })
    })

    const id_usuario_reader = await response.json()

    return id_usuario_reader.id_usuario
}

async function getIdUserOwner(id_publicacion) {
    const response = await fetch('/readAPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_publicacion })
    })

    const id_usuario_owner = await response.json()

    return id_usuario_owner.informacion_publicacion.id_usuario
}

async function crearChat(id_publicacion) {
    const response = await fetch('/crearChat', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_publicacion })
    })

    const id_chat = await response.json()
    return id_chat.id_chat
}

async function relacionarUsuarios(id_usuario, id_chat) {
    const response = await fetch('/relacionarUsuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario, id_chat })
    })
}

function mostrarChat(contenedor) {
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
                    <button class="send-button" id="btnSendMessage">
                        <img src="/imagenes/uploads/send_message.png" alt="Enviar" class="send-icon normal">
                        <img src="/imagenes/uploads/send_message_hover.png" alt="Enviar" class="send-icon hover">
                    </button>
                </form>
            </div>
        </div>
    `
}