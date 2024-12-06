const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: null}

export function userDataLoader (contenedor, session) {
    if ( session == true ){ 
        contenedor.href = '/perfil'
        contenedor.innerHTML = `<img src="${usedUser.foto_usuario}" alt="">`
    } else {
        contenedor.href = '/sign_in'
        contenedor.innerHTML = 'Inicio Sesión'
    }
}

export async function procesoCargarMascotas(contenedor, correo) {
    const id_usuario = await cargarIdUsuario(correo)

    const mascotas = await cargarMascotas(id_usuario)

    mostrarMascotas(contenedor, mascotas)
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

async function cargarMascotas(id_usuario) {
    const response = await fetch('/cargarMascotas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario })
    })

    const mascotas = await response.json()
    return mascotas
}

async function mostrarMascotas(contenedor, mascotas) {
    contenedor.innerHTML = ''
    
    for (let i = 0; i < mascotas.length; i++) {
        contenedor.innerHTML += `
            <div class="mascota__content">
                <div class="mascota__content--img">
                    <img src="${mascotas[i].foto_mascota}" alt="" >
                </div>
                <div class="mascota__content--name">
                    ${mascotas[i].nombre_mascota}
                </div>
            </div>
        `
    }

    contenedor.innerHTML += `
        <div class="mascotas__wrapper" id="contenedor_mascotas">
            <form class="addpet__form" id="agregar_mascota">
                <input type="submit" value="AGREGAR" class="addpet__submit">
            </form>
        </div>
    `
}
