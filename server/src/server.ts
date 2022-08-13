import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import { router } from './routes';
import cors from 'cors';
import { AppError } from './shared/errors/AppError';

const app = express();

app.use(cors());

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError)
            return response
                .status(err.statusCode)
                .json({ message: err.message });

        return response.status(500).json({
            status: 'error',
            message: `Internal Server Error - ${err.message}`,
        });
    },
);

app.get('/', (request, response) => response.send(':)'));

app.listen(3001, () => console.log('server started on port 3001'));
