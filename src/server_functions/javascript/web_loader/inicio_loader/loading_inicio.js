const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: "" }

export async function postLoader(contenedor) {
    const id_usuario = await getUserID()
    const resPublicaciones = await getPosts(id_usuario)

    for (let i = 0; i < resPublicaciones.informacion_Publicacion.length; i++) {
        const postOwner = await getOwnerName(resPublicaciones.informacion_Publicacion[i].id_usuario) 

        contenedor.innerHTML += `
            <div class="paginaprincipal__aside--card desaparecido">
            <div class="card__wrapperimg">
                <img src="${resPublicaciones.informacion_Mascota[i].imagen_mascota}" alt="" class="card__wrapperimg--img">
            </div>
            <p class="card__title">${resPublicaciones.informacion_Publicacion[i].titulo_publicacion}</p>
            <div class="card__wrapper">
                <div class="card__wrapper--content">
                    <p class="name">Nombre:  ${resPublicaciones.informacion_Mascota[i].nombre_mascota}</p>
                    <p class="place">Dueño:  ${postOwner}</p>
                    <p class="distintivo">Distintivo: ${resPublicaciones.informacion_Mascota[i].distintivo_mascota}</p>
                    <p class="fecha">Fecha de desaparición: ${new Date(resPublicaciones.informacion_Desaparicion[i].fecha_desaparicion).toLocaleDateString()}</p>
                </div>
                <div class="descripcion--wrapper">
                    <details>
                        <summary class="descipcion--title">Descripción</summary>
                        <p class="descipcion--text aparecer">
                            ${resPublicaciones.informacion_Publicacion[i].descripcion_desaparicion}
                        </p>
                    </details>
                </div>
            </div>
            <div class="card__wrapper--content--footer">
                <p class="card__footer--text">¿Eres el dueño de esta mascota?</p>
            </div>
            <button class="chat-button" value="${resPublicaciones.informacion_Publicacion[i].id_publicacion}">CHATEAR</button>
        </div>
        `
    }
}

export function userDataLoader (contenedor, session) {
    if ( session == true ){ 
        contenedor.href = '/perfil'
        contenedor.innerHTML = `<img src="${usedUser.foto_usuario}" alt="">`
    }
}

async function getUserID () {
    const correo = usedUser.correo

    const response = await fetch('/getUserID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo })
    })

    const respuesta = await response.json()

    return respuesta.id_usuario
}

async function getPosts (id_usuario) {
    const response = await fetch('/readOtherPosts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario })
    })

    const publicaciones = await response.json()
    return publicaciones
}

async function getOwnerName (id_usuario) {
    const response = await fetch('/getUserInformation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_usuario })
    })

    const postOwner = await response.json()
    return postOwner.nombre
}