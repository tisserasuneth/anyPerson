import express from 'express';
import QUEUE from './app/queue';
import logger from './app/lib/logger';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await QUEUE.connectQueue().then(async () => {
    await QUEUE.startConsumer();
    logger.info('Connected to queue');
}).catch((err) => {
    logger.error(`Failed to connect to queue: ${err.message}`);
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});