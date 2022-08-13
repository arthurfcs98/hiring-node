import { Request, Response } from 'express';
import { AppError } from '../../../../shared/errors/AppError';
import { DateProvider } from '../../../../shared/providers/DateProvider/DateProvider';
import { HistoryStockUseCase } from './HistoryStockUseCase';

class HistoryStockController {
    async handle(request: Request, response: Response): Promise<Response> {
        const symbol = request.params.symbol;
        const { from, to } = request.query;

        if (!from || !to) throw new AppError('Missing query params!');

        const dateProvider = new DateProvider();
        const historyStockUseCase = new HistoryStockUseCase(dateProvider);

        const historyEntries = await historyStockUseCase.execute(
            symbol,
            from as string,
            to as string,
        );

        return response.json({
            name: symbol.toUpperCase(),
            prices: historyEntries,
        });
    }
}

export { HistoryStockController };
