import person from './api/person.js';
import handleSocket from './api/chat.js';

export default function (app, webSocket) {
    app.use('/api', person);


    webSocket.use((socket, next) => {
        //Authenticate the socket
        next();
    });

    handleSocket(webSocket);
}