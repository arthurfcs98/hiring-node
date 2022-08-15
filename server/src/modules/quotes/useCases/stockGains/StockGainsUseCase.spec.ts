import { AppError } from '../../../../shared/errors/AppError';
import { DateProvider } from '../../../../shared/providers/DateProvider/DateProvider';
import { stockApi } from '../../../../shared/stockApi/StockApi';
import { StockGainsUseCase } from './StockGainsUseCase';

let stockGainsUseCase: StockGainsUseCase;
describe('Stock Gains Use Case', () => {
    beforeAll(() => {
        stockGainsUseCase = new StockGainsUseCase(new DateProvider());
        jest.setTimeout(50000);
    });

    it('Should be able to get stock gains', async () => {
        const apiSpy = jest.spyOn(stockApi, 'get');
        const gains = await stockGainsUseCase.execute('IBM', 299, '2021-12-22');

        expect(apiSpy).toBeCalled();
        expect(gains).toHaveProperty('capitalGains');
    });

    it('Should not be able to get stock history with a invalid purchase date', async () => {
        const apiSpy = jest.spyOn(stockApi, 'get');

        await expect(
            stockGainsUseCase.execute('IBM', 299, '2022-07-23'),
        ).rejects.toEqual(
            new AppError('Invalid purchase date!') ||
                new AppError(
                    'Cant connect with external API, wait and try again',
                ),
        );

        expect(apiSpy).toBeCalled();
    });
});
