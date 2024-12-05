export async function crearMensaje(id_usuario, id_chat, mensaje) {
    const response = await fetch('/crearMensaje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario, id_chat, mensaje })
    })
}
