import axios from 'axios';

const stockApi = axios.create({
    baseURL: 'https://www.alphavantage.co/query',
    params: {
        apikey: process.env.API_KEY,
    },
});

export { stockApi };
