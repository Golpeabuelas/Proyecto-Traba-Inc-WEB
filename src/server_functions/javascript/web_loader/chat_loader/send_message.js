export async function cargarMensajes(id_usuario_owner_post, id_usuario_reader_post, id_chat) {
    const response = await fetch('/cargarMensajes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ id_usuario_owner_post, id_usuario_reader_post, id_chat })
    })

    const mensajes = response.json()
    return mensajes
}

export function mostrarMensajes(contenedor, mensajes) {
    contenedor.innerHTML = '' 

    for (let i = 0; i < mensajes.reader.length; i++) {
        contenedor.innerHTML += `
            <div class="chat__msg ${mensajes.reader[i].Propietario === true ? 'msgEnviado' : 'msgRecibido'}">${mensajes.mensaje[i].Mensaje}</div>
        `
    }
}

export async function crearMensaje(id_usuario, id_chat, mensaje) {
    const response = await fetch('https://proyecto-traba-inc-web.onrender.com/crearMensaje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario, id_chat, mensaje })
    })
}
