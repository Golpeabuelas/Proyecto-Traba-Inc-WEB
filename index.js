import express from 'express';
import morgan from 'morgan';

import { join, dirname} from 'path';
import { fileURLToPath } from 'url';

import router from './src/server_functions/router_web.js'
import connection from './src/server_functions/connection_sql.js';

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/paginas', express.static(join(__dirname, './src/public')))
app.use('/scripts', express.static(join(__dirname, './src/server_functions/javascript')))

app.use(router)

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, './src/public/html/index.html'))
});

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
    console.log('http://localhost:' + app.get('port'));
});