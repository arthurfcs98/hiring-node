import { Router } from 'express';
import { FetchQuoteController } from '../modules/quotes/useCases/fetchQuote/FetchQuoteController';

const quoteRouter = Router();

const fetchQuoteController = new FetchQuoteController();

quoteRouter.get('/:symbol/quote', fetchQuoteController.handle);

export { quoteRouter };
