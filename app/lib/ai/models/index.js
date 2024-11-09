// Import models
import OpenAIGPT from "./gpt/index.js";

const MODEL_NAMES = {
    "OpenAIGPT": "OpenAIGPT",
}

class ModelHandler {

    static MODEL_NAMES = {
        ...MODEL_NAMES,
    }

    static MODELS = {
        [MODEL_NAMES.OpenAIGPT]: OpenAIGPT,
    };

    static getModel(name) {

        if (!ModelHandler.MODELS[name]) {
            throw new Error(`Invalid model name: ${name}`);
        }

        return ModelHandler.MODELS[name];
    }
}

export default ModelHandler;
