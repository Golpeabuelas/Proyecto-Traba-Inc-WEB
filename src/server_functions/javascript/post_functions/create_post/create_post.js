import { newPost } from "./new_post.js"

const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: '' }

export function getImage (cargarImagen, imageDefault, e) {
    return new Promise ((resolve) => {
        let image64x = ""
    
        if(e.target.files[0]){
            const reader = new FileReader()

            reader.onload = function (e){
                image64x = e.target.result
                cargarImagen.src = e.target.result
                resolve(image64x)
            }
            reader.readAsDataURL(e.target.files[0])
        } else{
            cargarImagen.src = imageDefault
        }
    })
}

export function fullRegister(inputs) {
    for (let i = 0; i < inputs.length; i++){
        if( inputs[i].value == inputs[i].defaultValue ) { 
            inputs[i].setCustomValidity('Todos los campos son necesarios')
            inputs[i].reportValidity()
            return false 
        } else if ( newPost.imagenMascota === null ) {
            inputs[5].setCustomValidity('Pon imagen de tu mascota >:(')
            inputs[5].reportValidity()
            return false
        }
        inputs[i].setCustomValidity('')
        inputs[i].reportValidity()
    }

    return true
}

export function añadirMarcador(map, marcador, e) {
    if ( marcador ) {
        map.removeLayer(marcador)
    }
    const latitud = e.latlng.lat
    const longitud = e.latlng.lng

    marcador = L.marker([latitud, longitud])
    marcador.addTo(map)

    return  { marcador: marcador, ubicacion: { latitud: latitud, longitud: longitud} }
}

export async function createPost () {
    console.log( newPost )
    const id_usuario = await getUserID()
    const titulo_publicacion = newPost.tituloPublicacion
    const fecha_publicacion = new Date().toISOString().split('T')[0]
    const imagen_mascota = newPost.imagenMascota
    const nombre_mascota = newPost.nombreMascota
    const especie_mascota = newPost.especieMascota
    const color_mascota = newPost.colorMascota
    const distintivo_mascota = newPost.distintivoMascota
    const fecha_desaparicion = newPost.fechaDesaparicion
    const descripcion_desaparicion = newPost.descripcionDesaparicion
    const estatus_reporte = newPost.estatusDesaparicion
    const latitud = newPost.latitudDesaparicion
    const longitud = newPost.longitudDesaparicion
    
    try {
        const response = await fetch('/crearPublicacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario, titulo_publicacion, fecha_publicacion, imagen_mascota, nombre_mascota, especie_mascota, color_mascota, distintivo_mascota, fecha_desaparicion, descripcion_desaparicion, estatus_reporte, latitud, longitud }),
        });

        if (!response.ok) {
            throw new Error('Error al crear publicación: ' + response.status);
        }
    } catch (error) {
        console.error('Error al crear publicación:', error);
    }

    window.location.href = '/perfil'
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