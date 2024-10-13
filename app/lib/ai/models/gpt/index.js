import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { messageGenerator } from "./utils.js";

//Prompts
import buildPersonPrompt from "./prompts/build-person.js";

//Schemas
import buildPersonSchema from "./schemas/build-person.js";

const MODEL = "gpt-4o-mini";

class OpenAIGPT {
    constructor() {
        this.model = new OpenAI();
    }

    static PROMPTS = {
        'BUILD_PERSON': buildPersonPrompt,
    };

    static SCHEMAS = {
        'BUILD_PERSON': buildPersonSchema,
    };

    async generateResponse(systemPrompt, userPrompt, schema) {
        const messages = messageGenerator(systemPrompt, userPrompt);

        const response = await this.model.chat.completions.create({
            model: MODEL,
            messages,
            response_format: zodResponseFormat(OpenAIGPT.SCHEMAS[schema], "build_person"),
        });

        if (!response.choices || !response.choices[0]) {
            throw new Error("Failed to generate response");
        }

        return response.choices[0].message.content;
    }
}

export default OpenAIGPT;
