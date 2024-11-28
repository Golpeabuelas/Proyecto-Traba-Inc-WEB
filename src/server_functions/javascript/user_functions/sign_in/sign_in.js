export async function iniciarSesion (Correo, Password) {
    const response = await fetch('/iniciarSesion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Correo, Password }),
    })

    //Manipular datos de la respuesta
}