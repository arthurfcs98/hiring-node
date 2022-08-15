import request from 'supertest';
import { app } from '../../../../app';

describe('Stock Gains Controller', () => {
    jest.setTimeout(50000);
    ('2021-12-22');
    it('Should be able to get stock gains', async () => {
        const response = await request(app).get(
            '/stocks/ibm/gains?purchasedAt=2021-12-22&purchasedAmount=1000',
        );
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('capitalGains');
    });

    it('Should not be able to get stock gains with missing query params', async () => {
        const response = await request(app).get('/stocks/ibm/gains');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Missing query params!');
    });
});
