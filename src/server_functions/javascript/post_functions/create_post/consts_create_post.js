import { soloLetras, etiquetasFixer, fechaPosterior } from "../../validaciones_inputs.js";
import { formularioPerdidoMascota, formularioPerdidoDesaparicion, formularioEncontrado, formularioEncontradoDesaparicion } from "./show_forms.js";
import { newPost } from "./new_post.js";
import { getImage, fullRegister, añadirMarcador, createPost } from "./create_post.js";

const usedUser = JSON.parse(localStorage.getItem('usuario')) || { correo: null }

const radios = document.getElementsByName('mascota')
const contenedor = document.getElementById('contenedor_formulario')

    if ( usedUser.correo ) {
                
        radios[0].addEventListener('change', () => {
            newPost.estatusDesaparicion = true

            formularioPerdidoMascota(contenedor)

            const titulo_publicacion = document.getElementById('titulo_publicacion')
            const nombre_mascota = document.getElementById('nombre_mascota')
            const especie_mascota = document.getElementById('especie_mascota')
            const color_mascota = document.getElementById('color_mascota')
            const distintivo_mascota = document.getElementById('distintivo_mascota')

            const imagen_mascota = document.getElementById('imagen_mascota')
            const cargarImagen = document.getElementById('cargar_imagen')
            const imageDefault = "/imagenes/Logo.png"

            const btnSiguiente = document.getElementById('btnSiguiente')

            const inputsNecesarios = document.getElementsByClassName('required')

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
            
            imagen_mascota.addEventListener('change', async (e) => {
                newPost.imagenMascota = await getImage(cargarImagen, imageDefault, e)
            });

            btnSiguiente.addEventListener('click', (e) => {
                e.preventDefault()

                const registroLleno = fullRegister(inputsNecesarios)

                if ( registroLleno ) {
                    newPost.tituloPublicacion = inputsNecesarios[0].value
                    newPost.nombreMascota = inputsNecesarios[1].value
                    newPost.especieMascota = inputsNecesarios[2].value
                    newPost.colorMascota = inputsNecesarios[3].value
                    newPost.distintivoMascota = inputsNecesarios[4].value

                    const map = formularioPerdidoDesaparicion(contenedor)
                    
                    let marcador = null

                    map.on('click', (e) => {
                        const objeto = añadirMarcador(map, marcador, e)
                        marcador = objeto.marcador

                        newPost.latitudDesaparicion = objeto.ubicacion.latitud
                        newPost.longitudDesaparicion = objeto.ubicacion.longitud
                    })

                    const fecha_desaparicion = document.getElementById('fecha_desaparicion')
                    const descripcion_desaparicion = document.getElementById('descripcion_desaparicion')

                    fecha_desaparicion.addEventListener('change', () => {
                        fechaPosterior(fecha_desaparicion)
                    })

                    fecha_desaparicion.addEventListener('keydown', (event) => {
                        event.preventDefault()
                    })

                    descripcion_desaparicion.addEventListener('input', () => {
                        etiquetasFixer(descripcion_desaparicion)
                    })

                    const inputsNecesariosD = document.getElementsByClassName('required')
                    const btnCrear = document.getElementById('crear_publicacion')

                    btnCrear.addEventListener('click', (e) => {
                        e.preventDefault()

                        const registroCompleto = fullRegister(inputsNecesariosD)

                        if ( newPost.latitudDesaparicion && newPost.longitudDesaparicion && registroCompleto ) {
                            newPost.fechaDesaparicion = inputsNecesarios[0].value
                            newPost.descripcionDesaparicion = inputsNecesarios[1].value

                            createPost()
                        } else if ( !(newPost.latitudDesaparicion && newPost.longitudDesaparicion) ) {
                            alert('selecciona la última ubicación donde lo viste en el mapa')
                        }
                    })
                }
            })
        })

        radios[1].addEventListener('change', () => {
            newPost.estatusDesaparicion = false
            
            formularioEncontrado(contenedor)

            const titulo_publicacion = document.getElementById('titulo_publicacion')
            const nombre_mascota = document.getElementById('nombre_mascota')
            const especie_mascota = document.getElementById('especie_mascota')
            const color_mascota = document.getElementById('color_mascota')
            const distintivo_mascota = document.getElementById('distintivo_mascota')

            const imagen_mascota = document.getElementById('imagen_mascota')
            const cargarImagen = document.getElementById('cargar_imagen')
            const imageDefault = "/imagenes/Logo.png"

            const btnSiguiente = document.getElementById('btnSiguiente')

            const inputsNecesarios = document.getElementsByClassName('required')

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
            
            imagen_mascota.addEventListener('change', async (e) => {
                newPost.imagenMascota = await getImage(cargarImagen, imageDefault, e)
            });

            btnSiguiente.addEventListener('click', (e) => {
                e.preventDefault()

                const registroLleno = fullRegister(inputsNecesarios)

                if ( registroLleno ) {
                    newPost.tituloPublicacion = inputsNecesarios[0].value
                    newPost.nombreMascota = inputsNecesarios[1].value
                    newPost.especieMascota = inputsNecesarios[2].value
                    newPost.colorMascota = inputsNecesarios[3].value
                    newPost.distintivoMascota = inputsNecesarios[4].value

                    const map = formularioEncontradoDesaparicion(contenedor)
                    
                    let marcador = null

                    map.on('click', (e) => {
                        const objeto = añadirMarcador(map, marcador, e)
                        marcador = objeto.marcador

                        newPost.latitudDesaparicion = objeto.ubicacion.latitud
                        newPost.longitudDesaparicion = objeto.ubicacion.longitud
                    })

                    const fecha_desaparicion = document.getElementById('fecha_desaparicion')
                    const descripcion_desaparicion = document.getElementById('descripcion_desaparicion')

                    fecha_desaparicion.addEventListener('change', () => {
                        fechaPosterior(fecha_desaparicion)
                    })

                    fecha_desaparicion.addEventListener('keydown', (event) => {
                        event.preventDefault()
                    })

                    descripcion_desaparicion.addEventListener('input', () => {
                        etiquetasFixer(descripcion_desaparicion)
                    })

                    const inputsNecesariosD = document.getElementsByClassName('required')
                    const btnCrear = document.getElementById('crear_publicacion')

                    btnCrear.addEventListener('click', (e) => {
                        e.preventDefault()

                        const registroCompleto = fullRegister(inputsNecesariosD)

                        if ( newPost.latitudDesaparicion && newPost.longitudDesaparicion && registroCompleto ) {
                            newPost.fechaDesaparicion = inputsNecesarios[0].value
                            newPost.descripcionDesaparicion = inputsNecesarios[1].value

                            createPost()
                        } else if ( !(newPost.latitudDesaparicion && newPost.longitudDesaparicion) ) {
                            alert('selecciona la última ubicación donde lo viste en el mapa')
                        }
                    })
                }
            })
        })
    } else {
        alert('Inicia sesión para que puedas hacer un reporte')
    }