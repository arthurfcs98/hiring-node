import { AppError } from '../../../../shared/errors/AppError';
import { stockApi } from '../../../../shared/stockApi/StockApi';
import { IGlobalQuote } from '../../dtos/IGlobalQuote';
import { IQuote } from '../../dtos/IQuote';

class FetchStockUseCase {
    async execute(symbol: string): Promise<IQuote> {
        const {
            data: { 'Global Quote': data },
        } = await stockApi.get<IGlobalQuote>('', {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol,
            },
        });

        if (!Object.keys(data).length) throw new AppError('Stock ');

        const quote = {
            name: data['01. symbol'],
            lastPrice: data['02. open'],
            pricedAt: data['07. latest trading day'],
        } as IQuote;
        return quote;
    }
}

export { FetchStockUseCase };
