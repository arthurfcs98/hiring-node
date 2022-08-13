import { AppError } from '../../../../shared/errors/AppError';
import { stockApi } from '../../../../shared/stockApi/StockApi';
import { IQuote } from '../../dtos/IQuote';

interface IResponse {
    'Global Quote': {
        '01. symbol': string;
        '02. open': number;
        '03. high': number;
        '04. low': number;
        '05. price': number;
        '06. volume': number;
        '07. latest trading day': Date;
        '08. previous close': number;
        '09. change': number;
        '10. change percent': string;
    };
}

class FetchQuoteUseCase {
    async execute(symbol: string): Promise<IQuote> {
        const {
            data: { 'Global Quote': data },
        } = await stockApi.get<IResponse>('', {
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

export { FetchQuoteUseCase };
