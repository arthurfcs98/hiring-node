import { Request, Response } from 'express';
import { AppError } from '../../../../shared/errors/AppError';
import { FetchQuoteUseCase } from './FetchQuoteUseCase';

class FetchQuoteController {
    async handle(request: Request, response: Response): Promise<Response> {
        const symbol = request.params.symbol;

        if (!symbol) throw new AppError('Missing Params');

        const fetchQuoteUseCase = new FetchQuoteUseCase();

        const quote = await fetchQuoteUseCase.execute(symbol);

        return response.json(quote);
    }
}

export { FetchQuoteController };
