export async function procesoAbrirChatOwner(id_owner, id_reader, id_chat, contenedor) {
    const existe = await verificarExistenciaChat(id_owner, id_reader, id_chat)
    
    if ( existe === true ) {
        const mensajes = await cargarMensajes(id_reader, id_owner, id_chat)

        const contenedorMensajes = mostrarChat(contenedor)
        mostrarMensajes(contenedorMensajes, mensajes)
    } else {
        alert('perra madre por qué intentas romper el programa biejo gei')
    }
} 

async function verificarExistenciaChat(id_owner, id_reader, id_chat) {
    const response = await fetch('/verificarChat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_owner, id_reader, id_chat })
    })

    const existe = await response.json()
    return existe.existe
} 

async function cargarMensajes(id_usuario_owner_post, id_usuario_reader_post, id_chat) {
    const response = await fetch('/cargarMensajes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario_owner_post, id_usuario_reader_post, id_chat })
    })

    const mensajes = await response.json()
    return mensajes
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
                    <button class="send-button" id="btnSendMessage" type="submit">
                        <img src="/imagenes/uploads/send_message.png" alt="Enviar" class="send-icon normal">
                        <img src="/imagenes/uploads/send_message_hover.png" alt="Enviar" class="send-icon hover">
                    </button>
                </form>
            </div>
        </div>
    `
    const contenedorMensajes = document.getElementById('mensajes')
    return contenedorMensajes
}

function mostrarMensajes(contenedor, mensajes) {
    for (let i = 0; i < mensajes.reader.length; i++) {
        contenedor.innerHTML += `
            <div class="chat__msg ${mensajes.reader[i].Propietario === true ? 'msgEnviado' : 'msgRecibido'}">${mensajes.mensaje[i].Mensaje}</div>
        `
    }
}