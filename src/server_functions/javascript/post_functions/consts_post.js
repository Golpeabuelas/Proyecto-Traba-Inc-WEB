import { soloLetras, fechaPosterior, etiquetasFixer } from "../validaciones_inputs.js"
import { fullRegister, getImage, addPost } from "./add_post.js"
import { newPost } from "./new_post.js";

const modal = document.getElementById('modal');
const openModal = document.getElementById('addPost');
const closeModal = document.querySelector('.close');

const titulo_publicacion = document.getElementById('titulo_publicacion')
const nombre_mascota = document.getElementById('nombre_mascota')
const especie_mascota = document.getElementById('especie_mascota')
const color_mascota = document.getElementById('color_mascota')
const distintivo_mascota = document.getElementById('distintivo_mascota')
const fecha_desaparicion = document.getElementById('fecha_desaparicion')
const descripcion_desaparicion = document.getElementById('descripcion_desaparicion')
const square = document.getElementById('square');

const imagen_mascota = document.getElementById('imagen_mascota')
const cargarImagen = document.getElementById('cargar_imagen')
const imageDefault = "/imagenes/Logo.png"

const inputsNecesarios = document.getElementsByClassName('require')
const btnNewPost = document.getElementById('new_post')

openModal.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

titulo_publicacion.addEventListener('input', () => {
    soloLetras(titulo_publicacion)
})

nombre_mascota.addEventListener('input', () => {
    soloLetras(nombre_mascota)
})

especie_mascota.addEventListener('input', () => {
    soloLetras(especie_mascota)
})

color_mascota.addEventListener('input', () => {
    soloLetras(color_mascota)
})

distintivo_mascota.addEventListener('input', () => {
    soloLetras(distintivo_mascota)
})

fecha_desaparicion.addEventListener('keydown', (event) => {
    event.preventDefault()
})

fecha_desaparicion.addEventListener('change', () => {
    fechaPosterior(fecha_desaparicion)
})

descripcion_desaparicion.addEventListener('input', () => {
    etiquetasFixer(descripcion_desaparicion)
})

imagen_mascota.addEventListener('change', async (e) => {
    newPost.imagenMascota = await getImage(cargarImagen, imageDefault, e)
});

btnNewPost.addEventListener('click', async (e) => {
    e.preventDefault()

    const registroLleno = fullRegister(inputsNecesarios, square)

    if ( registroLleno ) {
        newPost.tituloPublicacion = inputsNecesarios[0].value
        newPost.nombreMascota = inputsNecesarios[2].value
        newPost.especieMascota = inputsNecesarios[3].value
        newPost.colorMascota = inputsNecesarios[4].value
        newPost.distintivoMascota = inputsNecesarios[5].value
        newPost.fechaDesaparicion = inputsNecesarios[6].value
        newPost.descripcionDesaparicion = inputsNecesarios[1].value
    }

    await addPost()
})

//-----------------------------------------------------

const btnBuscar = document.getElementById('btnBuscar')
const idPublicacionBuscar = document.getElementById('idPublicacionBuscar')
const publicacion_encontrada = document.getElementById('publicacionEncontrada')

const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: "" };

export async function entrarPerfil () {
    const correo = usedUser.correo

    const response = await fetch('/getUserID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo })
    })

    const respuesta = await response.json()

    const id_usuario = respuesta.id_usuario

    const publicaciones = await fetch('readPublicacion', {})
}

/*cargarPost()

async function cargarPost() {
    try {
        const response = await fetch('/readPublicacion', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const respuesta = await response.json()

        for(let i = 0; i < respuesta.length; i++ ) {
            publicacion_encontrada.innerHTML = `
                
            <form class="formulario_publicacion">
                <div class="publicacion">
                    <div class="contenedor_izquierda">
                        <div class="contenedor_imagen">
                            <img src="${respuesta[i].informacion_mascota.imagen_mascota}">
                        </div>

                        <div class="contenedor_informacion_destacada">
                            <input placeholder="${respuesta[i].informacion_publicacion.titulo_publicacion}" >
                            
                            <textarea placeholder="${respuesta[i].informacion_desaparicion.descripcion_desaparicion}"></textarea>
                        </div>
                    </div>

                    <div class="contenedor_derecha">
                        <div class="contenedor_subtitulo">
                            <h2 class="subtitulo">INFORMACIÓN</h2>
                        </div>

                        <div class="contenedor_informacion">
                            <input placeholder="${respuesta[i].informacion_mascota.nombre_mascota}">
                            <input placeholder="${respuesta[i].informacion_mascota.especie_mascota}">
                            <input placeholder="${respuesta[i].informacion_mascota.color_mascota}">
                            <input placeholder="${respuesta[i].informacion_mascota.distintivo_mascota}">

                            <input type="date" value="${respuesta[i].informacion_desaparicion.fecha_desaparicion}">
                        </div>

                        <div class="contenedor_api_maps">
                            <input type="text" id="latitud">
                            <input type="text" id="longitud">
                        </div>
                    </div>
                </div>
                
            </form>`
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}*/
