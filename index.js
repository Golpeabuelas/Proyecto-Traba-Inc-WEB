import express from 'express';
import morgan from 'morgan';

import { createServer } from 'node:http';
import { iniciarSocketSever } from './index_socket.js';

import { join, dirname} from 'path';
import { fileURLToPath } from 'url';

import router from './src/server_functions/router_web.js'

import sesiones from './src/server_functions/javascript/user_functions/crud_sesiones.js'
import userLoader from './src/server_functions/javascript/user_functions/user_loader.js';

import publicaciones from './src/server_functions/javascript/post_functions/crud_publicaciones.js';
import postLoader from './src/server_functions/javascript/post_functions/post_loader.js';

import chatLoader from './src/server_functions/javascript/chat_functions/chat_loader.js';
import mensajeLoader from './src/server_functions/javascript/chat_functions/mensaje_loader.js';

import mascotasLoader from './src/server_functions/javascript/mascotas_functions/mascotas_loader.js';
import connection from './src/server_functions/connection_sql.js';

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const server = createServer(app)
iniciarSocketSever(server) 

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'))
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json({ limit: '5mb' }))

app.use('/imagenes', express.static(join(__dirname, './src/public/imagenes')))
app.use('/modulo', express.static(join(__dirname, './src/public/modulos')))
app.use('/scripts', express.static(join(__dirname, './src/server_functions/')))

app.use(router)

app.use(sesiones)
app.use(userLoader) 

app.use(publicaciones) 
app.use(postLoader) 

app.use(chatLoader) 
app.use(mensajeLoader) 

app.use(mascotasLoader)

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, './src/public/modulos/index/index.html'))
});

server.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
    console.log('http://localhost:' + app.get('port'));
});