import 'dotenv/config'
import express, { Response, Request } from 'express';
import "reflect-metadata";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dataSource from "./config/data-source";

const server = express();
const PORT = 3000;

server.use(cors());
server.use(cookieParser());
server.use(express.static("public"));
server.use(express.json());

server.use('/', (req: Request, res: Response): void => {
    res.send('Hello, world')
})

// Init db source
dataSource.initialize()
    .then(() => {
        console.log('Connected to Database successfully.')
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        })
    })
    .catch((error: Error) => console.log(error))

// TODO
// 1. Create and setup DB connection
// 2. Create DB entites and relationships
// 3. Implement API endpoints
// 4. Implement unit tests