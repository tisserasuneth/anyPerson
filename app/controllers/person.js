import QUEUE from '../queue/index.js';
import Character from '../models/character.js';
import MODELS from '../lib/ai/models/index.js';

import logger from '../lib/logger/index.js';
import CharacterTones from '../lib/ai/models/gpt/prompts/character-tones.js';

class Person {
    async create(req, res) {
        const { name, description, tone } = req.body;

        if (!name || !description || !tone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const character = await Character.create({ name, description, tone: CharacterTones[tone] });

            const job = QUEUE.createJob('BUILD_PERSON', character);
            await QUEUE.sendToQueue(job);

            return res.status(202).json({ message: 'BUILD_PERSON job submitted', character: character._id });
        } catch (err) {
            const errorMessage = `Error encountered while creating character`;
            logger.error(`${errorMessage}: ${err}`);
            return res.status(500).json({ error: errorMessage });
        }
    }

    async getCharacterById(req, res) {
        const { id: characterId } = req.params;

        if (!characterId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const character = await Character.findById(characterId);

            if (!character) {
                return res.status(404).json({ error: 'Character not found' });
            }

            return res.status(200).json(character);
        } catch (err) {
            const errorMessage = `Error encountered while fetching character`;
            logger.error(`${errorMessage}: ${err}`);
            return res.status(500).json({ error: errorMessage });
        }
    }

    async getImageById(req, res) {
        const { id: characterId } = req.params;

        if (!characterId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const character = await Character.findById(characterId);

            if (!character) {
                return res.status(404).json({ error: 'Character not found' });
            }

            const link = character?.image?.link;

            if (!link) {
                return res.status(404).json({ error: 'Character image not found' });
            }

            return res.status(200).json({ image: link });
        } catch (err) {
            const errorMessage = `Error encountered while fetching character image`;
            logger.error(`${errorMessage}: ${err}`);
            return res.status(500).json({ error: errorMessage });
        }
    }

    async delete(req, res) {
        const { id: characterId } = req.params;

        if (!characterId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const character = await Character.findById(characterId);

            if (!character) {
                return res.status(404).json({ error: 'Character not found' });
            }

            const MODEL_CLS = MODELS.getModel(MODELS.MODEL_NAMES.OpenAIGPT);
            const MODEL = new MODEL_CLS();

            await MODEL.deleteChat(character)

            await Character.deleteOne({ _id: characterId })

            return res.status(200).json({ message: 'Character has been deleted' });
        } catch (err) {
            const errorMessage = `Error encountered while deleting character`;
            logger.error(`${errorMessage}: ${err}`);
            return res.status(500).json({ error: errorMessage });
        }
    }
}

export default Person;
