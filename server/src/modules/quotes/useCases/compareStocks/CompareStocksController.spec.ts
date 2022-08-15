import request from 'supertest';
import { app } from '../../../../app';

describe('Compare Stock Controller', () => {
    it('Should be able to compare stock quotes', async () => {
        const response = await request(app).get(
            '/stocks/ibm/compare?stocksToCompare[]=bac',
        );
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('lastPrices');
    });

    it('Should not be able to compare stock quote without query params', async () => {
        const response = await request(app).get('/stocks/ibm/compare');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Missing query params!');
    });

    it('Should not be able to compare stock quote with wrong query params type', async () => {
        const response = await request(app).get(
            '/stocks/ibm/compare?stocksToCompare=bac',
        );
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Wrong query params type!');
    });
});
