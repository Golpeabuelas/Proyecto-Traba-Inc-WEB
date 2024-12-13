export function formularioPerdidoMascota (contenedor) {
    contenedor.innerHTML = `
        <input type="text" class="prev__infoperro1--input required" placeholder="Título de tu publicación" id="titulo_publicacion">
        <input type="text" class="prev__infoperro1--input required" placeholder="Nombre de tu mascota" id="nombre_mascota">
        <input type="text" class="prev__infoperro1--input required" placeholder="¿A qué especie pertenece tu mascota?" id="especie_mascota">
        <input type="text" class="prev__infoperro1--input required" placeholder="Color de tu mascota" id="color_mascota">
        <input type="text" class="prev__infoperro1--input required" placeholder="Algun distintivo como marcas, trucos, collares, etc" id="distintivo_mascota">
        <input type="file" placeholder="Una fotografía de la mascota" class="prev__infoperro1--inputimg required" id="imagen_mascota">
        <input type="submit" class="mkreporte__buttonEnviar" value="Siguiente" id="btnSiguiente"></input>
    `
}

export function formularioPerdidoDesaparicion (contenedor) {
    contenedor.innerHTML = `
        <label for="fecha_desaparicion" class="prev__infoperro1--input">¿Cuándo se perdió tu mascota?</label>
        <input type="date" class="prev__infoperro1--input required" id="fecha_desaparicion">
        <textarea class="prev__infoperro1--input required" placeholder="Más información que puede ayudar a encontrar a tu amigo" id="descripcion_desaparicion"></textarea>
        
        <div id="mapa">

        </div>
    `

    const mapa = document.getElementById('mapa')

    const map = cargarMapa(mapa)
    return map
}

function cargarMapa (mapa) {
    const map = L.map(mapa).setView([19.432884, -99.133179], 15)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map
}

export function formularioEncontrado (contenedor) {
    contenedor.innerHTML = `
        <input type="text" class="prev__infoperro1--input required" placeholder="Título de tu publicación" id="titulo_publicacion">
        <input type="text" class="prev__infoperro1--input required" placeholder="Nombre de la mascota" id="nombre_mascota">
        <input type="text" class="prev__infoperro1--input required" placeholder="¿A qué especie pertenece la mascota?" id="especie_mascota">
        <input type="text" class="prev__infoperro1--input required" placeholder="Color de la mascota" id="color_mascota">
        <input type="text" class="prev__infoperro1--input required" placeholder="Algun distintivo como marcas, trucos, collares, etc" id="distintivo_mascota">
        <input type="file" placeholder="Una fotografía de la mascota" class="prev__infoperro1--inputimg required" id="imagen_mascota">
        <input type="submit" class="mkreporte__buttonEnviar" value="Siguiente" id="btnSiguiente"></input>
    `
}

export function formularioEncontradoDesaparicion (contenedor) {
    contenedor.innerHTML = `
        <label for="fecha_desaparicion" class="prev__infoperro1--input">¿Cuándo encontraste a la mascota?</label>
        <input type="date" class="prev__infoperro1--input required" id="fecha_desaparicion">
        <textarea class="prev__infoperro1--input required" placeholder="Más información que pueda ayudar a su dueño a encontrar a su amigo" id="descripcion_desaparicion"></textarea>
        
        <div id="mapa">

        </div>
    `

    const mapa = document.getElementById('mapa')

    const map = cargarMapa(mapa)
    return map
}