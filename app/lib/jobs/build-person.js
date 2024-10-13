import MODELS from '../ai/models/index.js';

const LLM = 'OpenAIGPT';
const TYPE = 'BUILD_PERSON';

async function buildPerson(data) {
    const MODEL_HANDLER = new MODELS();
    const MODEL_CLS = MODEL_HANDLER.getModel(LLM);
    const MODEL = new MODEL_CLS();

    const response = await MODEL.generateResponse(
        MODEL_CLS.PROMPTS[TYPE],
        data,
        TYPE,
    );

    console.log(response);

    // Generate image
    //Save to DB
};

export default buildPerson;