import { Router } from 'express';
import { quoteRouter } from './quote.routes';

const router = Router();

router.use('/stock', quoteRouter);

export { router };
