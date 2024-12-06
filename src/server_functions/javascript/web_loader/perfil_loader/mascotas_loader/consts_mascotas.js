import { userDataLoader, procesoCargarMascotas } from "./loading_mascotas.js"
import { soloLetras } from "../../../validaciones_inputs.js"
import { getImage, fullRegister, agregarMascota  } from "../../../mascotas_functions/agregar_mascota.js"

const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: null }

const contenedorAcceso = document.getElementById('enlace_perfil')
const contenedorMascotas = document.getElementById('contenedor_mascotas')

    if ( usedUser.correo !== "" ) {
        userDataLoader(contenedorAcceso, true)
    } else {
        window.location.href = 'sign_in'
    }

await procesoCargarMascotas(contenedorMascotas, usedUser.correo)


//------------------------------------agregar mascotas--------------------------------------------
const newPet = {
    nombreMascota: null,
    especieMascota: null,
    fotoMascota: null
}

const btnAñadir = document.getElementById('añadir_mascota')
const nombreMascota = document.getElementById('nombre_mascota')
const especieMascota = document.getElementById('especie_mascota')

const fotoMascota = document.getElementById('foto_mascota')
const cargarImagen = document.getElementById('cargar_imagen')
const imageDefault = "/imagenes/Logo.png"

const inputsNecesarios = document.getElementsByClassName('required')

nombreMascota.addEventListener('input', () => {
    soloLetras(nombreMascota)
})

especieMascota.addEventListener('input', () => {
    soloLetras(especieMascota)
})

btnAñadir.addEventListener('click', (e) => {
    e.preventDefault()

    const registroLleno = fullRegister(inputsNecesarios)

    if ( registroLleno ) {
        newPet.nombreMascota = inputsNecesarios[0].value
        newPet.especieMascota = inputsNecesarios[1].value

        if ( newPet.fotoMascota ) {
            agregarMascota(newPet.nombreMascota, newPet.especieMascota, newPet.fotoMascota)
        }
    }
})

fotoMascota.addEventListener('change', async (e) => {
    newPet.fotoMascota = await getImage(cargarImagen, imageDefault, e)
    console.log(newPet.fotoMascota)
});

//-----------------------------------------modales-------------------------------------------

const addPetButton = document.querySelector('.addpet__submit');
const addPetModal = document.querySelector('.wrapper__modal--addpet');
const addPetContent = document.querySelector('.addpet__fondo');

addPetButton.addEventListener('click', (event) => {
    event.preventDefault();
    addPetModal.style.display = 'flex';
});

addPetModal.addEventListener('click', (event) => {
    if (!addPetContent.contains(event.target)) {
        addPetModal.style.display = 'none';
    }
});

