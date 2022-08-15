import { AppError } from '../../../../shared/errors/AppError';
import { IDateProvider } from '../../../../shared/providers/DateProvider/IDateProvider';
import { stockApi } from '../../../../shared/stockApi/StockApi';
import { IGlobalQuote } from '../../dtos/IGlobalQuote';
import { IStockGains } from '../../dtos/IStockGains';

class StockGainsUseCase {
    constructor(private dateProvider: IDateProvider) {}

    async execute(
        symbol: string,
        amount: number,
        purchaseDate: string,
    ): Promise<IStockGains> {
        const { data } = await stockApi.get<ITimeSeries>('/', {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol,
                outputsize: 'full',
            },
        });

        const {
            data: { 'Global Quote': stockData },
        } = await stockApi.get<IGlobalQuote>('', {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol,
            },
        });

        if (!data || !stockApi)
            throw new AppError(
                'Cant connect with external API, wait and try again',
            );
        if (!data['Time Series (Daily)'])
            throw new AppError(
                'Cant connect with external API, wait and try again',
            );

        const purchaseDateEntryInfos =
            data['Time Series (Daily)'][purchaseDate];

        if (!purchaseDateEntryInfos)
            throw new AppError('Invalid purchase date!');

        const capitalGains =
            ((stockData['05. price'] * 10000 -
                purchaseDateEntryInfos['4. close'] * 10000) *
                amount) /
            10000;

        return {
            name: symbol.toUpperCase(),
            purchasedAmount: amount,
            purchasedAt: purchaseDate,
            lastPrice: stockData['05. price'],
            priceAtDate: purchaseDateEntryInfos['4. close'],
            capitalGains,
        } as IStockGains;
    }
}

export { StockGainsUseCase };
