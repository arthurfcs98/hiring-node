import { DateProvider } from '../../../../shared/providers/DateProvider/DateProvider';
import { IDateProvider } from '../../../../shared/providers/DateProvider/IDateProvider';
import { stockApi } from '../../../../shared/stockApi/StockApi';
import { IHistoryEntry } from '../../dtos/IHistoryEntry';

class HistoryStockUseCase {
    constructor(private dateProvider: IDateProvider) {}
    async execute(
        symbol: string,
        startDate: string,
        endDate: string,
    ): Promise<IHistoryEntry[]> {
        const { data } = await stockApi.get<ITimeSeries>('/', {
            params: {
                function: 'TIME_SERIES_DAILY',
                symbol,
                outputsize: 'full',
            },
        });

        const dates = this.dateProvider.rangeDate(
            new Date(startDate),
            new Date(endDate),
        );

        const stringDates = dates.map(date => this.dateProvider.isoText(date));

        const entries = data['Time Series (Daily)'];

        const historyEntries = stringDates
            .map(date => {
                if (entries[date]) {
                    return {
                        opening: entries[date]['1. open']
                            ? entries[date]['1. open']
                            : 123,
                        closing: entries[date]['4. close'],
                        high: entries[date]['2. high'],
                        low: entries[date]['3. low'],
                        volume: entries[date]['5. volume'],
                        pricedAt: date,
                    } as IHistoryEntry;
                }

                return;
            })
            .filter(arg => arg);

        return historyEntries;
    }
}

export { HistoryStockUseCase };
