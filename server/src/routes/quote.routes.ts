import { Router } from 'express';
import { CompareStocksController } from '../modules/quotes/useCases/compareStocks/CompareStocksController';
import { FetchStockController } from '../modules/quotes/useCases/fetchStock/FetchStockController';

const quoteRouter = Router();

const fetchStockController = new FetchStockController();
const compareStocksController = new CompareStocksController();

quoteRouter.get('/:symbol/quote', fetchStockController.handle);
quoteRouter.get('/:symbol/compare', compareStocksController.handle);

export { quoteRouter };
