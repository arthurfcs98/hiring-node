import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';

const app = express();

app.get('/', (request, response) => response.send(':)'));

app.listen(3000, () => console.log('server started on port 3000'));
