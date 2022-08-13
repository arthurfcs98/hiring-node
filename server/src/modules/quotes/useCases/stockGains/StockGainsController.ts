import { Request, Response } from 'express';
import { AppError } from '../../../../shared/errors/AppError';
import { DateProvider } from '../../../../shared/providers/DateProvider/DateProvider';
import { StockGainsUseCase } from '../stockGains/StockGainsUseCase';

class StockGainsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const symbol = request.params.symbol;
        const { purchasedAt, purchasedAmount } = request.query;

        if (!purchasedAt || !purchasedAmount)
            throw new AppError('Missing query params!');

        const dateProvider = new DateProvider();
        const stockGainsUseCase = new StockGainsUseCase(dateProvider);

        const stockGains = await stockGainsUseCase.execute(
            symbol,
            Number(purchasedAmount),
            purchasedAt as string,
        );

        return response.json(stockGains);
    }
}

export { StockGainsController };
