import { AppError } from '../../../../shared/errors/AppError';
import { stockApi } from '../../../../shared/stockApi/StockApi';
import { FetchStockUseCase } from './FetchStockUseCase';

let fetchStockUserCase: FetchStockUseCase;

describe('Fetch Stock Quote', () => {
    beforeAll(() => {
        fetchStockUserCase = new FetchStockUseCase();
    });

    it('Should be able to fetch stock quote', async () => {
        const apiSpy = jest.spyOn(stockApi, 'get');
        const quote = await fetchStockUserCase.execute('IBM');
        expect(quote.name).toBe('IBM');
        expect(apiSpy).toBeCalled();
    });
    it('Should not be able to fetch stock quote with a invalid symbol', async () => {
        const apiSpy = jest.spyOn(stockApi, 'get');

        await expect(fetchStockUserCase.execute('ashjdj')).rejects.toEqual(
            new AppError('Stock does not exists') ||
                new AppError(
                    'Cant connect with external API, wait and try again',
                ),
        );
        expect(apiSpy).toBeCalled();
    });
});
