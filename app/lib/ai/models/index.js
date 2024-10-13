// Import models
import OpenAIGPT from "./gpt/index.js";

class ModelHandler {
    constructor() {
        this.models = {
            OpenAIGPT: new OpenAIGPT(),
        };
    }

    getModel(name) {
        return this.models[name];
    }
}

export default ModelHandler;
