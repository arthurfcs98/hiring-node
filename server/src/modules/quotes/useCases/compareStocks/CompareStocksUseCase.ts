import { stockApi } from '../../../../shared/stockApi/StockApi';
import { IGlobalQuote } from '../../dtos/IGlobalQuote';
import { IQuote } from '../../dtos/IQuote';

class CompareStocksUseCase {
    async execute(
        symbol: string,
        symbolsToCompare: string[],
    ): Promise<IQuote[]> {
        symbolsToCompare.push(symbol);

        const promisesQuote = symbolsToCompare.map(
            async symbol =>
                await stockApi.get<IGlobalQuote>('', {
                    params: { function: 'GLOBAL_QUOTE', symbol },
                }),
        );

        const response = await Promise.all(promisesQuote);

        const quotes = response
            .map(({ data }) => {
                const quote = data['Global Quote'];

                if (!quote) return;
                if (!Object.keys(quote).length) return;

                return {
                    name: quote['01. symbol'],
                    lastPrice: quote['05. price'],
                    pricedAt: quote['07. latest trading day'],
                } as IQuote;
            })
            .filter(arg => arg);

        return quotes;
    }
}

export { CompareStocksUseCase };
