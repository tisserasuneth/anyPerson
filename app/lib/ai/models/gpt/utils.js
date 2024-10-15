export function messageGenerator(systemPrompt, userMessage) {

    if (typeof systemPrompt !== "string" || typeof userMessage !== "object") {
        throw new Error("systemPrompt and userMessage must be strings");
    }

    return [
        {
            role: "system",
            content: [
                {
                    type: "text",
                    text: JSON.stringify(systemPrompt),
                }
            ]
        },
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: JSON.stringify(userMessage),
                }
            ]
        }
    ]
};
