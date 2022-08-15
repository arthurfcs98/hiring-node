import { AppError } from '../../../../shared/errors/AppError';
import { stockApi } from '../../../../shared/stockApi/StockApi';
import { CompareStocksUseCase } from './CompareStocksUseCase';

let compareStockUseCase: CompareStocksUseCase;

describe('Compare Stock Use Case', () => {
    beforeAll(() => {
        compareStockUseCase = new CompareStocksUseCase();
    });

    it('Should be able to compare stock quote', async () => {
        const apiSpy = jest.spyOn(stockApi, 'get');
        const quotes = await compareStockUseCase.execute('IBM', ['BAC']);
        expect(quotes.length).toBe(2);
        expect(apiSpy).toBeCalled();
    });

    it('Should not be able to compare stock quote with a invalids symbol', async () => {
        const apiSpy = jest.spyOn(stockApi, 'get');

        await expect(
            compareStockUseCase.execute('asdas', ['dsadas']),
        ).rejects.toEqual(new AppError('One Or More invalid Stock!'));
        expect(apiSpy).toBeCalled();
    });
});
