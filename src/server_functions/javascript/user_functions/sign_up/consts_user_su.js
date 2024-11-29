import { etiquetasFixerEmail, soloLetras } from "../../validaciones_inputs.js"
import { getImage, fullRegister, otorgarPermisos, signUp, verificarCorreo } from "./sign_up.js"
import { newUser } from "./new_user.js"

const nombre = document.getElementById('nombre')
const correo = document.getElementById('correo')
const password = document.getElementById('password')
const fotoUsuario = document.getElementById('foto_usuario')
const inputsRequeridos = document.getElementsByClassName('required')

const btnSignUp = document.getElementById('btn_sign_up')

nombre.addEventListener('input', () => {
    soloLetras(nombre)
})

correo.addEventListener('input', () => {
    etiquetasFixerEmail(correo)
})

password.addEventListener('input', () => {
    etiquetasFixerEmail(password)
})

fotoUsuario.addEventListener('change', async (e) => {
    newUser.fotoUsuario = await getImage(e)
})

btnSignUp.addEventListener('click', async (event) => {
    event.preventDefault()

    const registroLleno = fullRegister(inputsRequeridos)

    if ( registroLleno ) {
        newUser.nombre = nombre.value
        newUser.correo = correo.value
        newUser.password = password.value

        const correoDisponible = await verificarCorreo(correo)
        newUser.permisos = await otorgarPermisos()

        if( correoDisponible === true ) {   
            await signUp()
        } else {
            correo.setCustomValidity('Ya se ha iniciado sesión con este correo')
            correo.reportValidity()
        }
    } 
})


