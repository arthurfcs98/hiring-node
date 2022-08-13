import { Router } from 'express';
import { quoteRouter } from './quote.routes';

const router = Router();

router.use('/stocks', quoteRouter);

export { router };
