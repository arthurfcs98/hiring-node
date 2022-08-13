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

        if (!data)
            throw new AppError(
                'Cant connect with external API, wait and try again',
            );
        if (!Object.keys(data).length)
            throw new AppError('Stock does not exists');

        const quote = {
            name: data['01. symbol'],
            lastPrice: data['02. open'],
            pricedAt: data['07. latest trading day'],
        } as IQuote;
        return quote;
    }
}

export { FetchStockUseCase };
