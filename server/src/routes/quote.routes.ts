import { Router } from 'express';
import { FetchStockController } from '../modules/quotes/useCases/fetchQuote/FetchStockController';

const quoteRouter = Router();

const fetchStockController = new FetchStockController();

quoteRouter.get('/:symbol/quote', fetchStockController.handle);

export { quoteRouter };
