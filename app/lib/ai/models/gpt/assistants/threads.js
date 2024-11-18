import OpenAI from "openai";

class Threads {
    constructor(assistantId) {
        this.model = new OpenAI();
        this.assistantId = assistantId;
    }

    async createThread() {
        const { id } = await this.model.beta.threads.create();
        this.threadId = id;
        return id;
    }

    async createMessage(message) {

        if (!this.threadId) {
            throw new Error("Thread not found");
        }

        return this.model.beta.threads.messages.create(
            this.threadId,
            {
                role: "user",
                content: message,
            }
        );
    }

    async createRun() {

        if (!this.threadId) {
            throw new Error("Thread not found");
        }

        if (!this.assistantId) {
            throw new Error("Assistant not found, please create an assistant first");
        }

        return this.model.beta.threads.runs.stream(this.threadId,
            { assistant_id: this.assistantId }
        )
    }

    async getThread() {

        if (!this.threadId) {
            throw new Error("Thread not found");
        }

        return this.model.beta.threads.retrieve(this.threadId);
    }

    async deleteThread() {

        if (!this.threadId) {
            throw new Error("Thread not found");
        }

        return this.model.beta.threads.del(this.threadId);
    }


}

export default Threads;
