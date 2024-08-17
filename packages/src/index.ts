import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dataSource from "./config/data-source";
import { logger } from './log/logger';
import userRoute from './routes/user-route';
import articleRoute from  './routes/article-route';

const server = express();
const PORT = 3000;

server.use(cors());
server.use(cookieParser());
server.use(express.static('public'));
server.use(express.json());

server.use('/api/v1/user', userRoute);
server.use('api/v1/article', articleRoute);

dataSource.initialize()
    .then(() => {
        logger.info('Connected to Database successfully.')
        server.listen(PORT, () => {
            logger.info(`Server listening on port ${PORT}`)
        })
    })
    .catch((error: Error) => logger.error(error.message))