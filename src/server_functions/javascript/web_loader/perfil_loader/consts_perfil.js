import { userDataLoader, postLoader} from "./loading_perfil.js"

const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: ''}

const contenedorPublicaciones = document.getElementById('contenedor_publicaciones')
const contenedorAcceso = document.getElementById('enlace_perfil')

if( usedUser.correo !== '') {     
    userDataLoader(contenedorAcceso, true)
    
    postLoader(contenedorPublicaciones)
} else {
    alert('inicia sesion')
    userDataLoader(contenedorAcceso, false)
}