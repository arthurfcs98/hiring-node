import { Request, Response } from 'express';
import { AppError } from '../../../../shared/errors/AppError';
import { CompareStocksUseCase } from './CompareStocksUseCase';

class CompareStocksController {
    async handle(request: Request, response: Response): Promise<Response> {
        const symbol = request.params.symbol;
        const { stocksToCompare } = request.query;

        if (!stocksToCompare) throw new AppError('Missing query params!');
        if (!Array.isArray(stocksToCompare))
            throw new AppError('Wrong query params type!');

        const compareStockUseCase = new CompareStocksUseCase();

        const quotes = await compareStockUseCase.execute(
            symbol,
            stocksToCompare as string[],
        );

        return response.json({ lastPrices: quotes });
    }
}
export { CompareStocksController };
