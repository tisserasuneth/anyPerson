// Import models

class ModelHandler {
    constructor() {
        this.models = {};
    }

    getModel(name) {
        return this.models[name];
    }
}

export default ModelHandler;
