interface IGlobalQuote {
    'Global Quote': {
        '01. symbol': string;
        '02. open': number;
        '03. high': number;
        '04. low': number;
        '05. price': number;
        '06. volume': number;
        '07. latest trading day': Date;
        '08. previous close': number;
        '09. change': number;
        '10. change percent': string;
    };
}

export { IGlobalQuote };
