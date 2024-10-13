import schemas from "./schemas/index.js";
import { zodResponseFormat } from "openai/helpers/zod";

export function messageGenerator(systemPrompt, userMessage) {
    return [
        {
            role: "system",
            content: [
                {
                    type: "text",
                    text: systemPrompt,
                }
            ]
        },
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: userMessage,
                }
            ]
        }
    ]
};

export function getResponseSchema(type) {
    return zodResponseFormat(schemas[type]);
};