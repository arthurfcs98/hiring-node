interface IStockGains {
    name: string;
    lastPrice: number;
    priceAtDate: number;
    purchasedAmount: number;
    purchasedAt: string;
    capitalGains: number;
}

export { IStockGains };
