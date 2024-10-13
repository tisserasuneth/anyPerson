export function messageGenerator(systemPrompt, userMessage) {
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
