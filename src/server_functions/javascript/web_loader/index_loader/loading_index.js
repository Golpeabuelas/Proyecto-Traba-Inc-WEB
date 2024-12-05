export function userDataLoader (contenedor, session) {
    if ( session == true ){ 
        contenedor.href = '/inicio'
        contenedor.innerHTML = 'Follow Pet'
        window.location.href = '/inicio'
    } else {
        contenedor.href = '/sign_in'
        contenedor.innerHTML = 'Inicio Sesión'
    }
}