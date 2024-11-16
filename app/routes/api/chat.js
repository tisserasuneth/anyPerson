import Chat from "../../controllers/chat.js";
import logger from "../../lib/logger/index.js";

const SOCKET_TIMEOUT = 5 * 60 * 1000;

function setTimer(socket) {
    if (socket.timeOutTimer) {
        clearTimeout(socket.timeOutTimer);
    }

    socket.timeOutTimer = setTimeout(() => {
        socket.disconnect(true);
    }, SOCKET_TIMEOUT);
}

function clearTimer(socket) {
    if (socket.timeOutTimer) {
        clearTimeout(socket.timeOutTimer);
    }
}

function initializeSocket(socket, controller) {
    try {
        setTimer(socket);
        controller.initialize(socket);
    } catch (error) {
        const errorMessage = `Error initializing socket: ${error.message || error}`;
        logger.error(errorMessage);
        socket.emit(Chat.EVENTS.ERROR, `Error encountered while initializing socket`);
    }
}

function handleSocket(webSocket) {
    try {
        webSocket.on('connection', (socket) => {
            const controller = new Chat();
            initializeSocket(socket, controller);

            socket.on(Chat.EVENTS.NEW_MESSAGE, async (message) => {
                try {
                    setTimer(socket);
                    const stream = await controller.handleMessage(socket, message);

                    stream.on('textDelta', async (delta) => {
                        await socket.emit(Chat.EVENTS.NEW_MESSAGE, delta.value);
                    });

                    stream.on('textDone', async (delta) => {
                        await socket.emit(Chat.EVENTS.MESSAGE_END);
                    });

                } catch (error) {
                    const errorMessage = `Error handling message event: ${error.message || error}`;
                    logger.error(errorMessage);
                    socket.emit(Chat.EVENTS.ERROR, `Error encountered while handling message event`);
                }
            });

            socket.on(Chat.EVENTS.DISCONNECT, () => {
                clearTimer(socket);
                controller.disconnect(socket);
                socket.disconnect(true);
            });
        });
    } catch (error) {
        const errorMessage = `Error handling socket events: ${error.message || error}`;
        logger.error(errorMessage);
    }
}

export default handleSocket;
