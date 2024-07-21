import express, { Response, Request } from 'express';
import "reflect-metadata";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const server = express();
const PORT = 3000;

server.use(cors());
server.use(cookieParser());
server.use(express.static("public"));
server.use(express.json());

server.use('/', (req: Request, res: Response): void => {
    res.send('Hello, world')
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})