import QUEUE from '../queue/index.js';
import Character from '../models/character.js';

class Person {
    async create(req, res) {
        const { name, age, description } = req.body;

        if (!name || !age || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        let character = await Character.create({ name, age, description });

        const job = QUEUE.createJob('BUILD_PERSON', character);
        await QUEUE.sendToQueue(job);

        return res.status(202).json({ message: 'BUILD_PERSON job submitted', character: character.id });
    }
}

export default Person;
