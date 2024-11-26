export function getImage (image64x, cargarImagen, imageDefault, e) {
    if(e.target.files[0]){
        const reader = new FileReader()
        reader.onload = function (e){
            image64x = e.target.result;
            cargarImagen.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
    } else{
        cargarImagen.src = imageDefault
    }
}

export function fullRegister() {
    
}