export async function iniciarSesion (Correo, Password) {
    const correo = Correo.value
    const password = Password.value
    
    const response = await fetch('/iniciarSesion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, password }),
    })
    
    const respuesta = await response.json()

    if ( respuesta.Acceso === true) {
        const usedUser = {
            nombre: respuesta.Response.nombre,
            correo: respuesta.Response.correo,
            password: respuesta.Response.password,
            foto_usuario: respuesta.Response.foto_usuario,
            permisos: respuesta.Response.permisos 
        }

        localStorage.setItem('usuario', JSON.stringify( usedUser ))

        window.location.href = '/index'
    } else {
        Password.setCustomValidity('Contraseña incorrecta');
        Password.reportValidity();
    }
}