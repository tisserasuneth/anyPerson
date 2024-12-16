import MODELS from '../ai/models/index.js';
import logger from '../logger/index.js';
import Character from '../../models/character.js';

const TYPE = 'BUILD_PERSON';

async function buildPerson(data) {
    let character;
    try {

        character = await Character.findOne({ _id: data._id });

        if (!character) {
            throw new Error('Character not found');
        }

        character.metaData.state = Character.STATES.PROCESSING;
        await character.save();


        const MODEL_CLS = MODELS.getModel(MODELS.MODEL_NAMES.OpenAIGPT);
        const MODEL = new MODEL_CLS();

        const response = await MODEL.generateResponse(
            MODEL_CLS.PROMPTS[TYPE],
            data,
            TYPE,
        );

        const parsedResponse = JSON.parse(response);
        const { features, imageDescription, summary } = parsedResponse;

        character.set({
            ...features,
            imageDescription,
            summary,
            metaData: { state: Character.STATES.COMPLETED },
        });

        const assistant = await MODEL.startChat(character)
            .catch((err) => {
                const errorMessage = `Error encountered while starting chat for character`;
                logger.error(`${errorMessage} ${character._id}: ${err}`);
                return res.status(500).json({ error: errorMessage });
            });

        character.assistant = assistant.id;

        await character.save();

    } catch (error) {
        logger.error(`Error encountered while building character: ${error.message}`);
    
        if (character) {
            character.metaData.state = Character.STATES.FAILED;
            character.metaData.errors.push(error.message);
            await character.save();
        }
    }
};

export default buildPerson;