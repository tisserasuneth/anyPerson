import QUEUE from '../queue/index.js';
import Character from '../models/character.js';
import MODELS from '../lib/ai/models/index.js';

import logger from '../lib/logger/index.js';

class Person {
    async create(req, res) {
        const { name, description, personalize } = req.body;

        if (!name || !description, !personalize) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const character = await Character.create({ name, description, personalize })
            .catch((err) => {
                const errorMessage = `Error encountered while creating character`;
                logger.error(`${errorMessage}: ${err}`);
                return res.status(500).json({ error: errorMessage });
        });

        const job = QUEUE.createJob('BUILD_PERSON', character);
        await QUEUE.sendToQueue(job);

        return res.status(202).json({ message: 'BUILD_PERSON job submitted', character: character._id });
    }

    async getCharacterById(req, res) {
        const { id: characterId } = req.params;

        if (!characterId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const character = await Character.findById(characterId)
            .catch((err) => {
                const errorMessage = `Error encountered while finding character`;
                logger.error(`${errorMessage}: ${err}`);
                return res.status(500).json({ error: errorMessage });
            });

        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }

        return res.status(200).json(character);
    }

    async delete(req, res) {
        const { id: characterId } = req.params;

        if (!characterId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const character = await Character.findById(characterId)
            .catch((err) => {
                const errorMessage = `Error encountered while finding character`;
                logger.error(`${errorMessage}: ${err}`);
                return res.status(500).json({ error: errorMessage });
            });

        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }

        const MODEL_CLS = MODELS.getModel(MODELS.MODEL_NAMES.OpenAIGPT);
        const MODEL = new MODEL_CLS();

        await MODEL.deleteChat(character)
            .catch((err) => {
                const errorMessage = `Error encountered while deleting chat for character`;
                logger.error(`${errorMessage} ${character._id}: ${err}`);
                return res.status(500).json({ error: errorMessage });
            });

        await Character.deleteOne({ _id: characterId })

        return res.status(200).json({ message: 'Character has been deleted' });
    }
}

export default Person;
