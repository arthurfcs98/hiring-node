import { Request, Response } from 'express';
import { AppError } from '../../../../shared/errors/AppError';
import { FetchStockUseCase } from './FetchStockUseCase';

class FetchStockController {
    async handle(request: Request, response: Response): Promise<Response> {
        const symbol = request.params.symbol;

        if (!symbol) throw new AppError('Missing Params');

        const fetchStockUseCase = new FetchStockUseCase();

        const quote = await fetchStockUseCase.execute(symbol);

        return response.json(quote);
    }
}

export { FetchStockController };
