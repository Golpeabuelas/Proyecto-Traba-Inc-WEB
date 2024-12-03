const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: ""}

export async function postLoader(contenedor) {
    const id_usuario = await getUserID()
    const resPublicaciones = await getPosts(id_usuario)

    for (let i = 0; i < resPublicaciones.informacion_Publicacion.length; i++) {
        const postOwner = await getOwnerName(resPublicaciones.informacion_Publicacion[i].id_usuario) 

        contenedor.innerHTML += `
            <div class="card" style="margin-inline: 40px">
                <img src="${resPublicaciones.informacion_Mascota[i].imagen_mascota}" alt="Pugberto" class="card-image">
                
                <div class="card-content">
                    <h3>${resPublicaciones.informacion_Publicacion[i].titulo_publicacion}</h3>
                    <p><strong>Dueño:</strong> ${postOwner}</p>
                    <p><strong>Nombre:</strong> ${resPublicaciones.informacion_Mascota[i].nombre_mascota}</p>
                    <p><strong>Distintivo:</strong> ${resPublicaciones.informacion_Mascota[i].distintivo_mascota}</p>
                    <p><strong>Fecha de desaparición:</strong> ${new Date(resPublicaciones.informacion_Desaparicion[i].fecha_desaparicion).toLocaleDateString()}</p>
                    <p><strong>Descripcion:</strong> ${resPublicaciones.informacion_Desaparicion[i].descripcion_desaparicion}</p>
                    <p>¿Tienes información de su paradero?</p>
                    
                    <button class="chat-button" value="${resPublicaciones.informacion_Publicacion[i].id_publicacion}">CHATEAR</button>
                </div>
            </div>
        `
    }
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