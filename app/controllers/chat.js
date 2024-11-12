import Assistants from "../lib/ai/models/gpt/assistants/index.js";
import Threads from "../lib/ai/models/gpt/assistants/threads.js";

class Chat {
    async handleEvents(stream) {
        stream.on('textDelta', (data) => {
            //Emit the data to the client
        });

        stream.on('textDone', (data) => {
            //Emit the data to the client
        });
    }

    //Create Message, run thread, handle stream
}

export default Chat;