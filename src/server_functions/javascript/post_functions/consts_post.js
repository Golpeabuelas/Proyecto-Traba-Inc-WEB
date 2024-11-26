import { soloLetras, fechaPosterior, etiquetasFixer } from "../validaciones_inputs.js"
import { getImage } from "./new_post.js"

const titulo_publicacion = document.getElementById('titulo_publicacion')
const nombre_mascota = document.getElementById('nombre_mascota')
const especie_mascota = document.getElementById('especie_mascota')
const color_mascota = document.getElementById('color_mascota')
const distintivo_mascota = document.getElementById('distintivo_mascota')
const fecha_desaparicion = document.getElementById('fecha_desaparicion')
const descripcion_desaparicion = document.getElementById('descripcion_desaparicion')

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

fecha_desaparicion.addEventListener('change', () => {
    fechaPosterior(fecha_desaparicion)
})

descripcion_desaparicion.addEventListener('input', () => {
    etiquetasFixer(descripcion_desaparicion)
})

const imagen_mascota = document.getElementById('imagen_mascota')
const cargarImagen = document.getElementById('cargar_imagen')
const imageDefault = "/imagenes/Logo.png"
let image64x = "xx"

imagen_mascota.addEventListener( 'change', e => {
    getImage(image64x, cargarImagen, imageDefault, e)
});

const inputsNecesarios = document.getElementsByClassName('require')
const btnNewPost = document.getElementById('new_post')

btnNewPost.addEventListener('click', () => {
    console.log(cargarImagen.src)
})