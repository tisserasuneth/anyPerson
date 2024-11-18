import Character from "../models/character.js";
import Threads from "../lib/ai/models/gpt/assistants/threads.js";

class Chat {

    constructor() {
        this.threads = null;
        this.character = null;
        this.createdThread = null;
    }

    static EVENTS = {
        NEW_MESSAGE: 'new_message',
        SYSTEM_MESSAGE_CHUNK: 'system_message_chunk',
        SYSTEM_MESSAGE_END: 'system_message_end',
        MESSAGE_END: 'message_end',
        DISCONNECT: 'disconnect',
        ERROR: 'error',
    }

    async initialize(socket) {
        const { characterId } = socket?.handshake?.query;

        this.character = await Character.findById(characterId)
            .catch((err) => {
                throw new Error(`Error encountered while finding character: ${err.message || err}`);
            });

        if (!this.character || !this.character.assistant) {
            throw new Error("Character not found");
        }

        this.threads = new Threads(this.character.assistant);
        this.createdThread = this.threads.createThread()
    }

    async handleMessage(message) {

        await this.threads.createMessage(message)
            .catch((err) => {
                throw new Error(`Error encountered while creating message: ${err.message || err}`);
        });

        return this.threads.createRun()
            .catch((err) => {
                throw new Error(`Error encountered while creating run: ${err.message || err}`);
            });
    }

    async disconnect() {
        if (this.threads) {
            this.threads.deleteThread();
        }
    }
}

export default Chat;