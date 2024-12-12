import { etiquetasFixerEmail, longitud50Cadena, soloLetras, validarCorreo } from "../../validaciones_inputs.js"
import { getImage, fullRegister, otorgarPermisos, signUp, verificarCorreo } from "./sign_up.js"
import { newUser } from "./new_user.js"

const nombre = document.getElementById('nombre')
const correo = document.getElementById('correo')
const password = document.getElementById('password')
const fotoUsuario = document.getElementById('foto_usuario')
const inputsRequeridos = document.getElementsByClassName('required')

const uploadStatus = document.querySelector('.upload-status');

const btnSignUp = document.getElementById('btn_sign_up')
const mapa = document.getElementById('mapa')
const modalUbicacion = document.querySelector('.modal__ubicacion--wrapper');
const btnEnviar = document.getElementById('enviar_registro')

const map = L.map(mapa).setView([19.432884, -99.133179], 15)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

window.addEventListener('click', function(event) {
    if (event.target === modalUbicacion) {
        modalUbicacion.style.display = 'none';
    }
});

nombre.addEventListener('input', () => {
    soloLetras(nombre)
    longitud50Cadena(nombre)
})

correo.addEventListener('input', () => {
    etiquetasFixerEmail(correo)
    longitud50Cadena(correo)
})

password.addEventListener('input', () => {
    etiquetasFixerEmail(password)
    longitud50Cadena(password)
})

fotoUsuario.addEventListener('change', async (e) => {
    newUser.fotoUsuario = await getImage(e)
    const file = e.target.files[0];
    if (file) {
        uploadStatus.style.display = 'flex';
    } else {
        uploadStatus.style.display = 'none';
    }
})

let marcador = null

map.on('click', (e) => {
    if ( marcador ) {
        map.removeLayer(marcador)
    }
    const latitud = e.latlng.lat
    const longitud = e.latlng.lng

    marcador = L.marker([latitud, longitud])
    marcador.addTo(map)

    newUser.latitud = latitud
    newUser.longitud = longitud
})


btnSignUp.addEventListener('click', async (event) => {
    event.preventDefault()

    const registroLleno = fullRegister(inputsRequeridos)
    const estructuraEmail = validarCorreo(correo)

    if ( (registroLleno  && estructuraEmail) === true ) {
        newUser.nombre = nombre.value
        newUser.correo = correo.value
        newUser.password = password.value

        const correoDisponible = await verificarCorreo()
        newUser.permisos = await otorgarPermisos()

        if( correoDisponible === true && newUser.fotoUsuario) {   
            modalUbicacion.style.display = 'flex';

            btnEnviar.addEventListener('click', (e) => {
                e.preventDefault()
                
                console.log(newUser)
                if ( newUser.latitud && newUser.longitud ) {
                    signUp()
                } else {
                    alert('Asigna una ubicación aproximada')
                }
            })
            
        } else if ( correoDisponible === false){
            correo.setCustomValidity('Ya se ha iniciado sesión con este correo')
            correo.reportValidity()
        } else if ( newUser.fotoUsuario === null) {
            alert('Sube una foto')
        }
    } 
})


