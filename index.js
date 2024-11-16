import express from 'express';
import QUEUE from './app/queue/index.js';
import logger from './app/lib/logger/index.js';
import routes from './app/routes/index.js';

import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server as WebSocketServer } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const SERVER = createServer(app);
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';

const WSSERVER = new WebSocketServer(SERVER, {
    cors: {
        origin: '*' //TODO: Change this to the actual domain
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app, WSSERVER);

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Something went wrong!');
});

mongoose.connect(MONGO_URI)
.then(() => {
    logger.info('Connected to MongoDB');
}).catch((err) => {
    logger.error(`Failed to connect to database: ${err.message}`);
    process.exit(1);
});

QUEUE.connectQueue().then(async queue => {
    await QUEUE.startConsumer();
    logger.info(`Connected to Queue: ${queue.queue}`);
}).catch((err) => {
    logger.error(`Failed to connect to Queue: ${err.message}`);
});

SERVER.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
}).on('error', (err) => {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
});