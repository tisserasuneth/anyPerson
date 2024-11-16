import Character from "../models/character.js";
import Assistants from "../lib/ai/models/gpt/assistants/index.js";
import Threads from "../lib/ai/models/gpt/assistants/threads.js";

class Chat {

    constructor() {
        this.threads = null;
        this.character = null;
        this.createdThread = null;
    }

    static EVENTS = {
        NEW_MESSAGE: 'new_message',
        MESSAGE_END: 'message_end',
        DISCONNECT: 'disconnect',
        ERROR: 'error',
    }

    async initialize(socket) {

        this.character = await Character.findOne({ _id: socket.characterId })
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