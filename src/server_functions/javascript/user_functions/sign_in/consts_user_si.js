import { etiquetasFixerEmail } from "../../validaciones_inputs.js"
import { iniciarSesion } from "./sign_in.js"

const correo = document.getElementById('correo')
const password = document.getElementById('password')
const btnSignIn = document.getElementById('btn_sign_in')
const togglePassword = document.getElementById('toggle-password');


togglePassword.addEventListener('click', function() {
    const type = password.type === 'password' ? 'text' : 'password';
    password.type = type;

    togglePassword.textContent = type === 'password' ? 'visibility' : 'visibility_off';
});

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