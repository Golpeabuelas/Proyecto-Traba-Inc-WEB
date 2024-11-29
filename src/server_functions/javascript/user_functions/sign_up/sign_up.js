import { newUser } from "./new_user.js"

export function getImage (e) {
    return new Promise ((resolve) => {
        let image64x = ""
    
        if(e.target.files[0]){
            const reader = new FileReader()

            reader.onload = function (e){
                image64x = e.target.result
                resolve(image64x)
            }
            reader.readAsDataURL(e.target.files[0])
        }
    })
}

export function fullRegister(inputs) {
    for (let i = 0; i < inputs.length; i++){
        if( inputs[i].value == inputs[i].defaultValue ) { 
            inputs[i].setCustomValidity('Todos los campos son necesarios')
            inputs[i].reportValidity()
            return false 
        } 
        inputs[i].setCustomValidity('')
        inputs[i].reportValidity()
    }

    return true
}

export async function verificarCorreo(Correo) {   
    const correo = newUser.correo

    const response = await fetch('/buscarSesionExistente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo })
    })

    const usado = await response.json()

    return usado.correoDisponible
}

export async function otorgarPermisos() {
    const password = newUser.password

    const response = await fetch('/otorgarPermisos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    })

    const permisos = await response.json()

    return permisos.permisos
}

export async function signUp() {
    const nombre = newUser.nombre
    const correo = newUser.correo
    const password = newUser.password
    const foto_usuario = newUser.fotoUsuario
    const permisos = newUser.permisos

    const response = await fetch('/aniadirUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo, password, foto_usuario, permisos }),
    })

    const usedUser = {
        nombre: nombre,
        correo: correo,
        password: password,
        fotoUsuario: foto_usuario,
        permisos: permisos
    }

    localStorage.setItem('usedUser', JSON.stringify(usedUser));

    window.location.href = 'index'     
}