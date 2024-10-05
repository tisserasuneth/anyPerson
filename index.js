import express from 'express';
import logger from './app/lib/logger';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});