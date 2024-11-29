import { newPost } from "./new_post.js"

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

export function fullRegister(inputs, square) {
    for (let i = 0; i < inputs.length - 1; i++){
        if( inputs[i].value == inputs[i].defaultValue ) { 
            inputs[i].setCustomValidity('Todos los campos son necesarios')
            inputs[i].reportValidity()
            return false 
        } 
        inputs[i].setCustomValidity('')
        inputs[i].reportValidity()
    }

    if ( newPost.imagenMascota.length < 100 ) {
        showSquare(square)
        return false
    }

    return true
}

async function showSquare(square) {
    for(let i = 0; i < 2; i++) {
        square.classList.toggle('visible');

        await new Promise(resolve => setTimeout(resolve, 1500))
    }
    
}

export async function addPost() {
    const id_usuario = 1
    const titulo_publicacion = newPost.tituloPublicacion
    const imagen_mascota = newPost.imagenMascota
    const nombre_mascota = newPost.nombreMascota
    const especie_mascota = newPost.especieMascota
    const color_mascota = newPost.colorMascota
    const distintivo_mascota = newPost.distintivoMascota
    const fecha_desaparicion = newPost.fechaDesaparicion
    const descripcion_desaparicion = newPost.descripcionDesaparicion
    const latitud = 19.461373
    const longitud = -99.204781
    
    try {
        const response = await fetch('/crearPublicacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_usuario, titulo_publicacion, imagen_mascota, nombre_mascota, especie_mascota, color_mascota, distintivo_mascota, fecha_desaparicion, descripcion_desaparicion, latitud, longitud }),
        });

        if (!response.ok) {
            throw new Error('Error al crear publicación: ' + response.status);
        }
    } catch (error) {
        console.error('Error al crear publicación:', error);
    }
}