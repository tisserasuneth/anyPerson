import QUEUE from '../queue/index.js';

class Person {
    async create(req, res) {
        const { name, age, description } = req.body;

        if (!name || !age || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const job = QUEUE.createJob('BUILD_PERSON', { name, age, description });
        await QUEUE.sendToQueue(job);

        return res.status(202).json({ message: 'BUILD_PERSON job submitted' });
    }
}

export default Person;
