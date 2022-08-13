import { Router } from 'express';
import { CompareStocksController } from '../modules/quotes/useCases/compareStocks/CompareStocksController';
import { FetchStockController } from '../modules/quotes/useCases/fetchStock/FetchStockController';
import { HistoryStockController } from '../modules/quotes/useCases/historyStock/HistoryStockController';

const quoteRouter = Router();

const fetchStockController = new FetchStockController();
const compareStocksController = new CompareStocksController();
const historyStockController = new HistoryStockController();

quoteRouter.get('/:symbol/quote', fetchStockController.handle);
quoteRouter.get('/:symbol/compare', compareStocksController.handle);
quoteRouter.get('/:symbol/history', historyStockController.handle);

export { quoteRouter };
