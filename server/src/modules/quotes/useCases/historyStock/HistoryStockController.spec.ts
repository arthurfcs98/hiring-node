import request from 'supertest';
import { app } from '../../../../app';

describe('Get Stock history', () => {
    jest.setTimeout(50000);
    it('Should be able to get stock history', async () => {
        const response = await request(app).get(
            '/stocks/ibm/history?from=2022-06-30&to=2022-07-13',
        );
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('prices');
    });

    it('Should not be able to get stock history with missing query params', async () => {
        const response = await request(app).get('/stocks/ibm/history');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Missing query params!');
    });
});
