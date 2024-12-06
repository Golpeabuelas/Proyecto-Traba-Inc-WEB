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
        } else if ( inputs[2].value == inputs[2].defaultValue ) {
            inputs[2].setCustomValidity('Pon imagen de tu mascota >:(')
            inputs[2].reportValidity()
            return false
        }
        inputs[i].setCustomValidity('')
        inputs[i].reportValidity()
    }

    return true
}

export async function agregarMascota(nombre_mascota, especie_mascota, foto_mascota) {
    const id_usuario = await getUserID(usedUser.correo)
    
    const reponse = await fetch('/agregarMascota', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_usuario, nombre_mascota, especie_mascota, foto_mascota })
    })

    window.location.href = '/mascotas'
}

async function getUserID (correo) {
    const response = await fetch('/getUserID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo })
    })

    const id_usuario = await response.json()

    return id_usuario.id_usuario
}