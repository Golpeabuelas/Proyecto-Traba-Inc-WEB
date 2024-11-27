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
    alert(newPost.imagenMascota)
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

btnBuscar.addEventListener('click', async () => {
    await cargarPost(idPublicacionBuscar.value)
})

async function cargarPost(id) {
    try {
        const response = await fetch('/readPublicacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        const respuesta = await response.json()

        publicacion_encontrada.innerHTML = `
            
            <form class="formulario_publicacion">
                <div class="publicacion">
                    <div class="contenedor_izquierda">
                        <div class="contenedor_imagen">
                            <img src="">
                        </div>

                        <div class="contenedor_informacion_destacada">
                            <input placeholder="${respuesta.titulo_publicacion}" >
                            
                            <textarea placeholder="{response.descripcion_desaparicion}"></textarea>
                        </div>
                    </div>

                    <div class="contenedor_derecha">
                        <div class="contenedor_subtitulo">
                            <h2 class="subtitulo">INFORMACIÓN</h2>
                        </div>

                        <div class="contenedor_informacion">
                            <input placeholder="{response.nombre_mascota}">
                            <input placeholder="{response.especie_mascota}">
                            <input placeholder="{response.color_mascota}">
                            <input placeholder="{response.distintivo_mascota}">

                            <input type="date" >
                        </div>

                        <div class="contenedor_api_maps">
                            <input type="text" id="latitud">
                            <input type="text" id="longitud">
                        </div>
                    </div>
                </div>
                
            </form>`

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}
