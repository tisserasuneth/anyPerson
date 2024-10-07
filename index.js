import express from 'express';
import QUEUE from './app/queue/index.js';
import logger from './app/lib/logger/index.js';
import routes from './app/routes/index.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something went wrong!');
});

await QUEUE.connectQueue().then(async () => {
    await QUEUE.startConsumer();
    logger.info('Connected to queue');
}).catch((err) => {
    logger.error(`Failed to connect to queue: ${err.message}`);
});

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
}).on('error', (err) => {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
});