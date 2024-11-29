import { etiquetasFixerEmail } from "../../validaciones_inputs.js"
import { iniciarSesion } from "./sign_in.js"

const correo = document.getElementById('correo')
const password = document.getElementById('password')
const btnSignIn = document.getElementById('btn_sign_in')

correo.addEventListener('input', () => {
    etiquetasFixerEmail(correo)
})

password.addEventListener('input', () => {
    etiquetasFixerEmail(password)
})

btnSignIn.addEventListener('click', (event) => {
    event.preventDefault()

    if ( !(correo.value === correo.defaultValue)  && !(password.value === password.defaultValue) ) {
        iniciarSesion(correo, password)    
    }
})