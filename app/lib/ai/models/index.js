// Import models
import OpenAIGPT from "./gpt/index.js";

class ModelHandler {
    constructor() {
        this.models = {
            OpenAIGPT,
        };
    }

    getModel(name) {
        return this.models[name];
    }
}

export default ModelHandler;
