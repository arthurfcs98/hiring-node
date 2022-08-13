interface IDateProvider {
    rangeDate(startDate: Date, endDate: Date): Date[];
    dateUTC(date: Date, formatStr: string): string;
    isoText(date: Date): string;
}

export { IDateProvider };
