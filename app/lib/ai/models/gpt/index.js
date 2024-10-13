import OpenAI from "openai";
import { messageGenerator, getResponseSchema } from "./utils";

const MODEL = "gpt-4-o-mini";

class OpenAIGPT {
    constructor() {
        this.model = new OpenAI();
    }

    async generateResponse(systemPrompt, userPrompt, type) {
        const messages = messageGenerator(systemPrompt, userPrompt);

        const response = await this.model.chat.completions.create({
            model: MODEL,
            messages,
            response_format: getResponseSchema(type),
        });

        if (!response.choices || !response.choices[0]) {
            throw new Error("Failed to generate response");
        }

        return response.choices[0].message.content;
    }
}

export default OpenAIGPT;
