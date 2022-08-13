import request from 'supertest';
import { app } from '../../../../app';

describe('Fetch Stock Controller', () => {
    it('Should be able to get stock quote', async () => {
        const response = await request(app).get('/stocks/ibm/quote');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('lastPrice');
    });

    it('Should not be able to get stock quote with invalid symbol', async () => {
        const response = await request(app).get('/stocks/7483/quote');
        expect(response.status).toBe(400);
    });
});
