# Proyecto-Traba-Inc-WEB

Hasta este momento solo se ha avanzado en la arquitectura del servidor 
y algunas validaciones menores. Para ejecutar el servidor se deben de seguir 
los siguientes pasos:

    I. Instalar los node_modules que se necesitarán para ejecutar el programa
    ctrl + ñ para abrir una terminal y ejecutar el comando < npm i > que
    instalará todas las dependencias que requerirá el sistema

    II. En la ruta src/database/script_sql.sql se encuentra la base de 
    datos que deberá ser ejecutada en mySQLWorkbench o algún otro sistema 
    de mysql8

    III. En la ruta src/server_functions/connection_sql.js viene la conexión
    que se deberá personalizar de acuerdo a la contraseña, host y usuario del
    ejecutante

    IV. Existen dos scripts principales dentro del packade.json, primero se 
    deberá ejecutar en la terminal abierta el comando npm run start que abrirá
    y ejecutará la función más importante del sistema

    v. Para ejecutar el servidor con nodemon se deberá ejecutar el comando 
    npm run dev que dará un link que se podrá seguir con ctrl + click  

Para los colaboradores que quieran hacer contribuciones a este repositorio
deberán seguir estos pasos para no afectar la lógica de la rama main, que 
solo se modificará cuando el proyecto esté terminado, por esta razón los 
commits y push a dicha rama están desahabilitados. 
    
    I. Crear una nueva rama en GitHub
        Ir a la pestaña **Branches**.
        Hacer clic en **New Branch**.
        Asignar un nombre descriptivo que indique la actividad 
        que se hará en esta nueva rama.

    II. Clonar el repositorio
        En el repositorio hacer clic en el botón **Code**.
        Copia la URL del repositorio.
        En tu terminal, ejecuta el comando:
  
        git clone [URL del repositorio]

    III. Abrir el proyecto
        Abrir el proyecto en el VSCode y asegurarse de estar
        en la rama main, NO hacer cambios en esta rama

    IV. Cambiar a la nueva rama
        En la terminal, navega a la carpeta del repositorio:
  
        cd [nombre-del-repositorio]

        Para cambiar de rama y crearla localmente para enlazarla 
        con la remota:

        git checkout -b [nombre-de-la-rama] origin/[nombre-de-la-rama]
   
    V.Realizar los cambios
        Haz tus cambios necesarios en el proyecto.
    
        Agrega los archivos al área de preparación:

        git add 

        Crea un commit con un mensaje claro que describa tus cambios:

        git commit -m "Descripción breve de los cambios"


    VI. Subir los cambios a GitHub
        Envía los cambios a la rama remota:
    
        git push origin [nombre-de-la-rama]
     