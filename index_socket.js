import { Server } from "socket.io";
import { crearMensaje } from "./src/server_functions/javascript/web_loader/chat_loader/send_message.js";

export async function iniciarSocketSever(server) {
    const socketServer = new Server(server)
        
    socketServer.on('connection', (socket) => {
        console.log('A user has connected')

        socket.on('disconnect', () => {
            console.log('A user has disconnected')
        })

        socket.on('chat message', async ({ id_owner, id_reader, id_chat, mensaje }) => {
            try {
                await crearMensaje(id_owner, id_chat, mensaje)
                socketServer.emit('chat message', { id_owner, id_reader, id_chat })
            } catch (error) {
                console.error('Fallamos la solicitud del proceso del mensaje', error)
            }
        })
    })
}