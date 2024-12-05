export async function procesoCargarPublicaciones(contenedor, correo) {
    const id_usuario = await cargarIdUsuario(correo)
    const publicaciones = await cargarPublicacionesUsuario(id_usuario)

    mostrarPublicaciones(contenedor, publicaciones)
}

async function cargarIdUsuario(correo) {
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

async function cargarPublicacionesUsuario(id_usuario) {
    const response = await fetch('/readOwnPosts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario })
    })

    const publicaciones = await response.json()
    return publicaciones
}

function mostrarPublicaciones(contenedor, publicaciones) {
    for (let i = 0; i < publicaciones.informacion_Publicacion.length; i++) {
        contenedor.innerHTML += `
            <div class="reporte__content publicaciones" data-value="${publicaciones.informacion_Publicacion[i].id_publicacion}">
                <div class="reporte__content--img">
                    <img src="${publicaciones.informacion_Mascota[i].imagen_mascota}" alt="" >
                </div>
                <div class="reporte__content--name">
                    ${publicaciones.informacion_Mascota[i].nombre_mascota}
                </div>
            </div>
        `
    }
}

