import { DateProvider } from '../../../../shared/providers/DateProvider/DateProvider';
import { stockApi } from '../../../../shared/stockApi/StockApi';
import { HistoryStockUseCase } from './HistoryStockUseCase';

let historyStockUseCase: HistoryStockUseCase;

describe('Get Stock History', () => {
    beforeAll(() => {
        historyStockUseCase = new HistoryStockUseCase(new DateProvider());
        jest.setTimeout(50000);
    });

    it('Should be able to get stock history', async () => {
        const apiSpy = jest.spyOn(stockApi, 'get');
        const history = await historyStockUseCase.execute(
            'IBM',
            '2022-06-30',
            '2022-07-13',
        );
        expect(apiSpy).toBeCalled();
        expect(history.length).toBeGreaterThan(0);
    });
});
